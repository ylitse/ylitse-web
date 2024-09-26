import { createSelector } from 'reselect';
import { createApi } from '@reduxjs/toolkit/query/react';
import * as D from 'io-ts/Decoder';
import { parseAndTransformTo, refreshingBaseQuery } from '@/utils/http';
import { selectSelectedSkills, selectSearchString } from './mentorsFilterSlice';
import { capitalize } from '@/utils/utils';
import toast from 'react-hot-toast';
import { t } from 'i18next';

import { authenticationApi } from '../Authentication/authenticationApi';
import { selectUserId } from '../Authentication/userSlice';

export type ApiMentor = D.TypeOf<typeof mentorCodec>;

export const mentorCodec = D.struct({
  account_id: D.string,
  active: D.boolean,
  birth_year: D.number,
  communication_channels: D.array(D.string),
  created: D.string,
  display_name: D.string,
  gender: D.string,
  id: D.string,
  is_vacationing: D.boolean,
  languages: D.array(D.string),
  region: D.string,
  skills: D.array(D.string),
  status_message: D.string,
  story: D.string,
  user_id: D.string,
});

const mentorListResponseType = D.struct({ resources: D.array(mentorCodec) });
type MentorsResponse = D.TypeOf<typeof mentorListResponseType>;

export type Mentor = ReturnType<typeof toMentor>;

const toMentor = ({
  birth_year,
  communication_channels,
  created,
  display_name,
  gender,
  id,
  is_vacationing,
  languages,
  region,
  skills,
  status_message,
  story,
  user_id,
}: ApiMentor) => ({
  age: new Date().getFullYear() - birth_year,
  buddyId: user_id,
  communicationChannels: communication_channels,
  created: new Date(created).getTime(),
  gender,
  isVacationing: is_vacationing,
  languages,
  mentorId: id,
  name: display_name,
  region,
  skills: skills.map(skill => capitalize(skill)),
  statusMessage: status_message,
  story,
});

export type Mentors = Record<string, Mentor>;

const toMentorRecord = ({ resources }: MentorsResponse) =>
  resources.reduce((acc: Mentors, apiMentor) => {
    const mentor: Mentor = toMentor(apiMentor);
    return { ...acc, [mentor.buddyId]: mentor };
  }, {});

export const mentorsApi = createApi({
  baseQuery: refreshingBaseQuery,
  reducerPath: 'mentors',
  tagTypes: ['mentors'],

  endpoints: builder => ({
    getMentors: builder.query<Mentors, void>({
      query: () => 'mentors',
      providesTags: ['mentors'],
      transformResponse: (response: unknown) =>
        parseAndTransformTo(
          response,
          mentorListResponseType,
          { resources: [] },
          toMentorRecord,
          () => toast.error(t('mentors:notification.parsingMentorsError')),
        ),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(t('mentors:notification.fetchingMentorsError'));
        }
      },
    }),
    updateMentor: builder.mutation<unknown, ApiMentor>({
      query: mentor => ({
        url: `mentors/${mentor.id}`,
        method: 'put',
        body: mentor,
      }),
      invalidatesTags: ['mentors'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authenticationApi.util.invalidateTags(['myuser']));
          toast.success(t('profile:notification.success.update'));
        } catch (err) {
          toast.error(t('profile:notification.failure.update'));
        }
      },
    }),
  }),
});

const selectMentors = mentorsApi.endpoints.getMentors.select();

export const mapSkills = (mentors: Mentors, selectedSkills: Array<string>) => {
  const allSkills = Object.values(mentors)
    .map(mentor => mentor.skills)
    .flat();

  const amountMap = allSkills.reduce<Record<string, number>>((acc, skill) => {
    const amount = (acc[skill] ?? 0) + 1;
    return { ...acc, [skill]: amount };
  }, {});

  return Object.entries(amountMap)
    .sort(bySelectionOrRarity(selectedSkills))
    .map(([skill]) => skill);
};

const bySelectionOrRarity =
  (selectedSkills: Array<string>) =>
  (
    [skillA, amountA]: [string, number],
    [skillB, amountB]: [string, number],
  ) => {
    const isASelected = selectedSkills.includes(skillA);
    const isBSelected = selectedSkills.includes(skillB);
    if (isASelected && !isBSelected) {
      return -1;
    }

    if (isBSelected && !isASelected) {
      return 1;
    }

    return amountB - amountA;
  };

export const selectSkills = () =>
  createSelector(
    selectMentors,
    selectSelectedSkills,
    (mentorsResponse, selectedSkills) =>
      mapSkills(mentorsResponse.data ?? {}, selectedSkills),
  );

const withSkills =
  (selectedSkills: Array<string>) =>
  ({ skills: mentorSkills }: Mentor) =>
    selectedSkills.length > 0
      ? mentorSkills.some(skill => selectedSkills.includes(skill))
      : true;

const withSearchString =
  (searchString: string) =>
  ({ name, region, story, statusMessage, skills }: Mentor) =>
    searchString.length > 0
      ? [name, region, story, statusMessage, ...skills].some(value =>
          value.toLowerCase().includes(searchString.toLowerCase()),
        )
      : true;

export const selectFilteredMentors = () =>
  createSelector(
    selectMentors,
    selectSelectedSkills,
    selectSearchString,
    (mentorsQuery, selectedSkills, searchString) => {
      const mentors = mentorsQuery.data ?? {};
      const filteredMentors = Object.values(mentors)
        .filter(withSkills(selectedSkills))
        .filter(withSearchString(searchString));
      return filteredMentors;
    },
  );

export const selectNewestMentors = (amount: number) =>
  createSelector(selectMentors, mentorsQuery => {
    const mentors = mentorsQuery.data ?? {};
    const sortedMentors = Object.values(mentors).sort(
      (a, b) => b.created - a.created,
    );
    return sortedMentors.slice(0, amount);
  });

export const selectMentorById = (buddyId: string | null) =>
  createSelector(selectMentors, mentors =>
    buddyId ? mentors.data?.[buddyId] : undefined,
  );

export const selectMentorProfile = createSelector(
  [selectMentors, selectUserId],
  (mentors, userId) => mentors.data?.[userId],
);

export const { useGetMentorsQuery, useUpdateMentorMutation } = mentorsApi;

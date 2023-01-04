import { createSelector } from 'reselect';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as D from 'io-ts/Decoder';
import { validateAndTransformTo } from '@/utils/http';
import {
  selectSelectedSkills,
  selectSearchString,
} from './MentorsFilter/mentorsFilterSlice';
import { capitalize } from '@/utils/utils';

type ApiMentor = D.TypeOf<typeof apiMentorType>;

const apiMentorType = D.struct({
  user_id: D.string,
  id: D.string,
  birth_year: D.number,
  display_name: D.string,
  story: D.string,
  region: D.string,
  skills: D.array(D.string),
  languages: D.array(D.string),
  is_vacationing: D.boolean,
  status_message: D.string,
  gender: D.string,
  communication_channels: D.array(D.string),
});

const mentorListResponseType = D.struct({ resources: D.array(apiMentorType) });
type MentorsResponse = D.TypeOf<typeof mentorListResponseType>;

export type Mentor = ReturnType<typeof toMentor>;

const toMentor = ({
  birth_year,
  display_name,
  user_id,
  id,
  skills,
  communication_channels,
  is_vacationing,
  status_message,
  ...props
}: ApiMentor) => ({
  ...props,
  mentorId: id,
  buddyId: user_id,
  age: new Date().getFullYear() - birth_year,
  name: display_name,
  skills: skills.map(skill => capitalize(skill)),
  statusMessage: status_message,
  isVacationing: is_vacationing,
  communicationChannels: communication_channels,
});

export type Mentors = Record<string, Mentor>;

const toMentorRecord = ({ resources }: MentorsResponse) =>
  resources.reduce((acc: Mentors, apiMentor) => {
    const mentor: Mentor = toMentor(apiMentor);
    return { ...acc, [mentor.buddyId]: mentor };
  }, {});

export const mentorsApi = createApi({
  reducerPath: 'mentors',
  baseQuery: fetchBaseQuery({ baseUrl: 'api/' }),
  endpoints: builder => ({
    getMentors: builder.query<Mentors, void>({
      query: () => 'mentors',
      transformResponse: (response: unknown) =>
        validateAndTransformTo(
          response,
          mentorListResponseType,
          { resources: [] },
          toMentorRecord,
        ),
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

export const { useGetMentorsQuery } = mentorsApi;

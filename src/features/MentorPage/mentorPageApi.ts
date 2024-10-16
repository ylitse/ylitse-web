import { createApi } from '@reduxjs/toolkit/query/react';
import * as D from 'io-ts/Decoder';
import { parseAndTransformTo, refreshingBaseQuery } from '@/utils/http';
import toast from 'react-hot-toast';
import { t } from 'i18next';

import { authenticationApi } from '../Authentication/authenticationApi';

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
  skills,
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
          () =>
            toast.error(t('mentors:notification.parsingMentorsError'), {
              id: 'mentor-parse-failure',
            }),
        ),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(t('mentors:notification.fetchingMentorsError'), {
            id: 'mentor-fetch-failure',
          });
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
          toast.success(t('profile:notification.success.update'), {
            id: 'update-success',
          });
        } catch (err) {
          toast.error(t('profile:notification.failure.update'), {
            id: 'update-failure',
          });
        }
      },
    }),
  }),
});

export const { useGetMentorsQuery, useUpdateMentorMutation } = mentorsApi;

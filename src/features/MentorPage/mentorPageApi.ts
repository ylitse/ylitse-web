import { parseAndTransformTo } from '@/utils/http';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import { mentorListResponseType, toMentorRecord } from './models';

import { type ApiMentor, type Mentors } from './models';

import { baseApi } from '@/baseApi';

export const mentorsApi = baseApi.injectEndpoints({
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
      invalidatesTags: ['mentors', 'myuser'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
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

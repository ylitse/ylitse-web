import { baseApi } from '@/baseApi';
import { parseAndTransformTo } from '@/utils/http';
import { myuserResponse, defaultAppUser } from './models';
import { type AppUser } from './models';

export const authenticationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<AppUser, void>({
      query: () => 'myuser',
      providesTags: ['myuser'],
      transformResponse: (response: unknown) =>
        parseAndTransformTo(
          response,
          myuserResponse,
          defaultAppUser,
          user => user,
        ),
    }),
    logout: builder.mutation<unknown, void>({
      query: () => 'logout',
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          baseApi.util.resetApiState();
        } catch (err) {}
      },
    }),
  }),
});

export const { useLogoutMutation } = authenticationApi;

import { createApi } from '@reduxjs/toolkit/query/react';
import { refreshingBaseQuery } from '@/utils/http';
import type {
  Account,
  Mentor,
  User,
} from '../Authentication/authenticationApi';

type PasswordUpdate = {
  accountId: string;
  currentPassword: string;
  newPassword: string;
};

export const profilePageApi = createApi({
  baseQuery: refreshingBaseQuery,
  reducerPath: 'profile',
  endpoints: builder => ({
    changePassword: builder.mutation<unknown, PasswordUpdate>({
      query: ({ accountId, currentPassword, newPassword }) => ({
        url: `/accounts/${accountId}/password`,
        method: 'put',
        body: { current_password: currentPassword, new_password: newPassword },
      }),
    }),
    deleteAccount: builder.mutation<unknown, string>({
      query: accountId => ({
        url: `/accounts/${accountId}`,
        method: 'delete',
      }),
    }),
    updateAccount: builder.mutation<unknown, Account>({
      query: account => ({
        url: `/accounts/${account.id}`,
        method: 'put',
        body: account,
      }),
    }),
    updateMentor: builder.mutation<unknown, Mentor>({
      query: mentor => ({
        url: `/mentors/${mentor.id}`,
        method: 'put',
        body: mentor,
      }),
    }),
    updateUser: builder.mutation<unknown, User>({
      query: user => ({
        url: `/users/${user.id}`,
        method: 'put',
        body: user,
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
  useUpdateMentorMutation,
  useUpdateUserMutation,
} = profilePageApi;

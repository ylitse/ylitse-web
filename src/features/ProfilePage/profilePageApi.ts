import { createApi } from '@reduxjs/toolkit/query/react';

import { refreshingBaseQuery } from '@/utils/http';
import { UserRole } from '../Authentication/authenticationApi';

type PasswordUpdate = {
  accountId: string;
  currentPassword: string;
  newPassword: string;
};

type Account = {
  active: boolean;
  email: string;
  id: string;
  login_name: string;
  role: UserRole;
};

type User = {
  account_id: string;
  active: boolean;
  display_name: string;
  id: string;
  role: UserRole;
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
    updateUser: builder.mutation<unknown, User>({
      query: user => ({
        url: `/users/${user.id}`,
        method: 'put',
        body: user,
      }),
    }),
    updateAccount: builder.mutation<unknown, Account>({
      query: account => ({
        url: `/accounts/${account.id}`,
        method: 'put',
        body: account,
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useUpdateUserMutation,
  useUpdateAccountMutation,
} = profilePageApi;

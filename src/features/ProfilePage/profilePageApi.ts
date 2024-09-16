import { createApi } from '@reduxjs/toolkit/query/react';

import { refreshingBaseQuery } from '@/utils/http';

type PasswordUpdate = {
  accountId: string;
  currentPassword: string;
  newPassword: string;
};

type DisplayNameUpdate = {
  userId: string;
  displayName: string;
};

type EmailUpdate = {
  accountId: string;
  email: string;
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
    updateDisplayName: builder.mutation<unknown, DisplayNameUpdate>({
      query: ({ userId, displayName }) => ({
        url: `/users/${userId}`,
        method: 'patch',
        body: { displayName },
      }),
    }),
    updateEmail: builder.mutation<unknown, EmailUpdate>({
      query: ({ accountId, email }) => ({
        url: `/users/${accountId}`,
        method: 'patch',
        body: { email },
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useUpdateDisplayNameMutation,
  useUpdateEmailMutation,
} = profilePageApi;

import { createApi } from '@reduxjs/toolkit/query/react';

import { refreshingBaseQuery } from '@/utils/http';

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
  useDeleteAccountMutation,
  useUpdateDisplayNameMutation,
  useUpdateEmailMutation,
} = profilePageApi;

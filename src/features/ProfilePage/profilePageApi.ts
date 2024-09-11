import { createApi } from '@reduxjs/toolkit/query/react';

import { refreshingBaseQuery } from '@/utils/http';

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
  }),
});

export const { useDeleteAccountMutation } = profilePageApi;

import * as D from 'io-ts/Decoder';
import { createApi } from '@reduxjs/toolkit/query/react';
import { pipe } from 'fp-ts/lib/function';
import { t } from 'i18next';
import toast from 'react-hot-toast';

import { parseAndTransformTo, refreshingBaseQuery } from '@/utils/http';

export const role = D.literal('mentee', 'mentor', 'admin');

const userCodec = D.struct({
  account_id: D.string,
  active: D.boolean,
  display_name: D.string,
  id: D.string,
  role: role,
});

const accountCodec = D.struct({
  active: D.boolean,
  email: D.string,
  id: D.string,
  login_name: D.string,
  role: role,
});

const mentorCodec = D.struct({
  account_id: D.string,
  active: D.boolean,
  birth_year: D.number,
  communication_channels: D.array(D.string),
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

const commonResponse = D.struct({
  account: accountCodec,
  user: userCodec,
});

const mentorResponse = D.partial({
  mentor: mentorCodec,
});

const myuserResponse = pipe(commonResponse, D.intersect(mentorResponse));

export type UserRole = D.TypeOf<typeof role>;

export type Account = D.TypeOf<typeof accountCodec>;
export type MentorUser = D.TypeOf<typeof mentorCodec>;
export type User = D.TypeOf<typeof userCodec>;

export type AppUser = {
  account: Account;
  mentor?: MentorUser;
  user: User;
};

export const defaultAccount: Account = {
  active: false,
  email: '',
  id: '',
  login_name: '',
  role: 'mentee',
} as const;

export const defaultMentor: MentorUser = {
  account_id: '',
  active: false,
  birth_year: NaN,
  communication_channels: [],
  display_name: '',
  gender: '',
  id: '',
  is_vacationing: false,
  languages: [],
  region: '',
  skills: [],
  status_message: '',
  story: '',
  user_id: '',
};

export const defaultUser: User = {
  account_id: '',
  active: false,
  display_name: '',
  id: '',
  role: 'mentee',
} as const;

export const defaultAppUser: AppUser = {
  account: defaultAccount,
  mentor: defaultMentor,
  user: defaultUser,
};

type PasswordUpdate = {
  accountId: string;
  currentPassword: string;
  newPassword: string;
};

export const authenticationApi = createApi({
  baseQuery: refreshingBaseQuery,
  reducerPath: 'authentication',
  tagTypes: ['myuser'],

  endpoints: builder => ({
    changePassword: builder.mutation<unknown, PasswordUpdate>({
      query: ({ accountId, currentPassword, newPassword }) => ({
        url: `accounts/${accountId}/password`,
        method: 'put',
        body: { current_password: currentPassword, new_password: newPassword },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('profile:notification.success.password'));
        } catch (err) {
          toast.error(t('profile:notification.failure.password'));
        }
      },
    }),
    deleteAccount: builder.mutation<unknown, string>({
      query: accountId => ({
        url: `accounts/${accountId}`,
        method: 'delete',
      }),
      invalidatesTags: ['myuser'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authenticationApi.endpoints.logout.initiate());
        } catch (err) {
          toast.error(t('profile:notification.failure.delete'));
        }
      },
    }),
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
    }),
    updateAccount: builder.mutation<unknown, Account>({
      query: account => ({
        url: `accounts/${account.id}`,
        method: 'put',
        body: account,
      }),
      invalidatesTags: ['myuser'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('profile:notification.success.update'));
        } catch (err) {
          toast.error(t('profile:notification.failure.update'));
        }
      },
    }),
    updateUser: builder.mutation<unknown, User>({
      query: user => ({
        url: `users/${user.id}`,
        method: 'put',
        body: user,
      }),
      invalidatesTags: ['myuser'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('profile:notification.success.update'));
        } catch (err) {
          toast.error(t('profile:notification.failure.update'));
        }
      },
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useLogoutMutation,
  useUpdateAccountMutation,
  useUpdateUserMutation,
} = authenticationApi;

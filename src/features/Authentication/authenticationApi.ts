import * as D from 'io-ts/Decoder';
import { createApi } from '@reduxjs/toolkit/query/react';
import { pipe } from 'fp-ts/lib/function';

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
export type Mentor = D.TypeOf<typeof mentorCodec>;
export type User = D.TypeOf<typeof userCodec>;

export type AppUser = {
  account: Account;
  mentor?: Mentor;
  user: User;
};

export const defaultAccount: Account = {
  active: false,
  email: '',
  id: '',
  login_name: '',
  role: 'mentee',
} as const;

export const defaultMentor: Mentor = {
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

export const authenticationApi = createApi({
  baseQuery: refreshingBaseQuery,
  reducerPath: 'authentication',

  endpoints: builder => ({
    getMe: builder.query<AppUser, void>({
      query: () => 'myuser',
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
  }),
});

export const { useLogoutMutation } = authenticationApi;

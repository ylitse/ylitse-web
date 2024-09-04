import { createApi } from '@reduxjs/toolkit/query/react';
import { parseAndTransformTo, refreshingBaseQuery } from '@/utils/http';
import * as D from 'io-ts/Decoder';

export const role = D.literal('mentee', 'mentor', 'admin');

const userCodec = D.struct({
  account_id: D.string,
  active: D.boolean,
  created: D.string,
  display_name: D.string,
  id: D.string,
  role: role,
  updated: D.string,
});

const accountCodec = D.struct({
  active: D.boolean,
  created: D.string,
  email: D.string,
  id: D.string,
  login_name: D.string,
  role: role,
  updated: D.string,
});

const myuserResponse = D.struct({
  account: accountCodec,
  user: userCodec,
});

type UserResponse = D.TypeOf<typeof myuserResponse>;
export type UserRole = D.TypeOf<typeof role>;

type AppUser = {
  active: boolean;
  displayName: string;
  email: string;
  loginName: string;
  userId: string;
  userRole: UserRole;
};

const defaultAccount = {
  active: false,
  created: '',
  email: '',
  id: '',
  login_name: '',
  role: 'mentee',
  updated: '',
} as const;

const defaultUser = {
  account_id: '',
  active: false,
  created: '',
  display_name: '',
  id: '',
  role: 'mentee',
  updated: '',
} as const;

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
          { account: defaultAccount, user: defaultUser },
          toUserInfo,
        ),
    }),
    logout: builder.mutation<unknown, void>({
      query: () => 'logout',
    }),
  }),
});

const toUserInfo = (user: UserResponse): AppUser => ({
  active: user.account.active,
  displayName: user.user.display_name,
  email: user.account.email,
  loginName: user.account.login_name,
  userId: user.user.id,
  userRole: user.account.role,
});

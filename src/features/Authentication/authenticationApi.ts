import * as D from 'io-ts/Decoder';
import { createApi } from '@reduxjs/toolkit/query/react';

import { mentorCodec } from '../MentorPage/mentorPageApi';
import { parseAndTransformTo, refreshingBaseQuery } from '@/utils/http';

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
  mentor: mentorCodec,
  user: userCodec,
});

type UserResponse = D.TypeOf<typeof myuserResponse>;
export type UserRole = D.TypeOf<typeof role>;

export type MentorData = {
  birthYear: number;
  isAbsent: boolean;
  region: string;
  skills: Array<string>;
  status: string;
  story: string;
};

type AppUser = {
  accountId: string;
  active: boolean;
  displayName: string;
  email: string;
  loginName: string;
  userId: string;
  userRole: UserRole;
  mentorData: MentorData | null;
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

const defaultMentor = {
  birth_year: NaN,
  communication_channels: [],
  created: '',
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
          { account: defaultAccount, user: defaultUser, mentor: defaultMentor },
          toUserInfo,
        ),
    }),
    logout: builder.mutation<unknown, void>({
      query: () => 'logout',
    }),
  }),
});

const toUserInfo = (user: UserResponse): AppUser => ({
  accountId: user.account.id,
  active: user.account.active,
  displayName: user.user.display_name,
  email: user.account.email,
  loginName: user.account.login_name,
  userId: user.user.id,
  userRole: user.account.role,
  mentorData:
    user.account.role === 'mentor'
      ? {
          birthYear: user.mentor.birth_year,
          isAbsent: user.mentor.is_vacationing,
          region: user.mentor.region,
          skills: user.mentor.skills,
          status: user.mentor.status_message,
          story: user.mentor.story,
        }
      : null,
});

export const { useLogoutMutation } = authenticationApi;

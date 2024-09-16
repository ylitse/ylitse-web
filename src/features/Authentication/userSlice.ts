import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import {
  authenticationApi,
  defaultAppUser,
  defaultMentor,
} from './authenticationApi';
import { selectChatsExist } from '../Chat/selectors';

import type { AppUser } from './authenticationApi';

const initialState: AppUser = defaultAppUser;

export const user = createSlice({
  initialState: initialState,
  name: 'user',
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        authenticationApi.endpoints.getMe.matchFulfilled,
        (_, { payload }) => payload,
      )
      .addMatcher(authenticationApi.endpoints.logout.matchFulfilled, () => {
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('access_token');
        window.location.href = '/login/';
        return initialState;
      });
  },
});

export const selectAccount = ({ user }: RootState) => user.account;

export const selectMentor = ({ user }: RootState) =>
  user.mentor ?? defaultMentor;

export const selectUser = ({ user }: RootState) => user.user;

export const selectIsLoggedIn = createSelector(selectUser, ({ id }) =>
  Boolean(id),
);

export const selectAccountId = createSelector(selectAccount, ({ id }) => id);

export const selectUserId = createSelector(selectUser, ({ id }) => id);

const selectUserRole = createSelector(selectUser, ({ role }) => role);

export const selectIsMentor = createSelector(
  selectUserRole,
  role => role === 'mentor',
);

export const selectAppRole = createSelector(
  selectUserRole,
  selectChatsExist,
  (userRole, hasUserChats) => {
    if (userRole === 'mentee' && !hasUserChats) return 'freshMentee';
    return userRole;
  },
);

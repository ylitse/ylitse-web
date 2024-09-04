import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import { type UserRole, authenticationApi } from './authenticationApi';
import { selectChatsExist } from '../Chat/selectors';

type User = {
  active: boolean;
  displayName: string;
  email: string;
  loginName: string;
  userId: string | null;
  userRole: UserRole | null;
};

const initialState: User = {
  active: false,
  displayName: '',
  email: '',
  loginName: '',
  userId: null,
  userRole: null,
};

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

const selectUserState = ({ user }: RootState) => user;

export const selectIsLoggedIn = createSelector(selectUserState, ({ userId }) =>
  Boolean(userId),
);

export const selectUserId = createSelector(
  selectUserState,
  ({ userId }) => userId,
);

export const selectUserRole = createSelector(
  selectUserState,
  ({ userRole }) => userRole ?? 'mentee',
);

export const selectAppRole = createSelector(
  selectUserRole,
  selectChatsExist,
  (userRole, hasUserChats) => {
    if (userRole === 'mentee' && !hasUserChats) return 'freshMentee';
    return userRole;
  },
);

export const selectUserInfo = createSelector(
  selectUserState,
  ({ active, displayName, email, loginName }) => ({
    active,
    displayName,
    email,
    loginName,
  }),
);

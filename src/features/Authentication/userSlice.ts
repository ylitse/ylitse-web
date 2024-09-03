import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';

import { authenticationApi, UserRole } from './authenticationApi';
import { RootState } from '@/store';
import { selectChatsExist } from '../Chat/chatSlice';

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
  selectChatsExist,
  ({ userRole }, hasUserChats) =>
    userRole === 'mentee' && !hasUserChats ? 'freshMentee' : userRole,
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

import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';

import { UserRole, authenticationApi } from './authenticationApi';
import { RootState } from '@/store';
import { selectChatsExist } from '../Chat/chatSlice';

type Authentication = {
  userId: string | null;
  userRole: UserRole | null;
  loginName: string | null;
  email: string | null;
  displayName: string | null;
  isActive: boolean | null;
};

const initialState: User = {
  userId: null,
  userRole: null,
  loginName: null,
  email: null,
  displayName: null,
  isActive: null,
};

export const user = createSlice({
  initialState: initialState,
  name: 'user',
  reducers: {
    logout: () => ({ userId: null, userRole: null }),
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
        return { userId: null, userRole: null };
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
  ({ loginName, email, displayName, isActive }) => ({
    loginName,
    email,
    displayName,
    isActive,
  }),
);

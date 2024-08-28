import { createSelector } from 'reselect';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { UserRole, authenticationApi } from './authenticationApi';
import { RootState } from '@/store';
import { selectChatsExist } from '../Chat/chatSlice';

type Authentication = {
  userId: string | null;
  userRole: UserRole | null;
};

const initialState: Authentication = {
  userId: null,
  userRole: null,
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
      .addMatcher(
        isAnyOf(
          authenticationApi.endpoints.getMe.matchRejected,
          authenticationApi.endpoints.logout.matchPending,
        ),
        () => {
          console.log('logout matched!');
          window.location.href = '/login/';
          return { userId: null, userRole: null };
        },
      );
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

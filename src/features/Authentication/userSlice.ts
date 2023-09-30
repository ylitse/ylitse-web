import { RootState } from '@/store';
import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';
import { isRight } from 'fp-ts/lib/Either';
import { fetchMyUser } from './myuserApi';

type Authentication = {
  userId: string | null;
};

const initialState: Authentication = {
  userId: null,
};

export const user = createSlice({
  initialState: initialState,
  name: 'user',
  reducers: {
    logout: () => {
      return { userId: null };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMyUser.fulfilled, ({ userId }, { payload }) => {
        const nextUserId = isRight(payload) ? payload.right.user.id : userId;
        return { userId: nextUserId };
      })
      .addCase(fetchMyUser.rejected, () => {
        window.location.href = '/login/';
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

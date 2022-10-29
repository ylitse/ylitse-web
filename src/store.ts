import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { mentorsApi } from './features/MentorPage/mentorPageApi';

export const store = configureStore({
  reducer: {
    [mentorsApi.reducerPath]: mentorsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(mentorsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

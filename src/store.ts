import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loadingReducer from '@/features/Loading/loadingSlice';
import { mentorsApi } from './features/MentorPage/mentorPageApi';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
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

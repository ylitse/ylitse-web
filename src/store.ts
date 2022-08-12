import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loadingReducer from '@/features/Loading/loadingSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { mentorApi } from './features/MentorPage/mentorPageApi';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    [mentorApi.reducerPath]: mentorApi.reducer,
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

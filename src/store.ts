import {
  configureStore,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { mentorsApi } from '@/features/MentorPage/mentorPageApi';
import { mentorsFilter } from '@/features/MentorPage/mentorsFilterSlice';
import { chats } from './features/Chat/chatSlice';

const rootReducer = combineReducers({
  [mentorsApi.reducerPath]: mentorsApi.reducer,
  [mentorsFilter.name]: mentorsFilter.reducer,
  [chats.name]: chats.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ immutableCheck: true }).concat(
        mentorsApi.middleware,
      ),
    preloadedState,
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

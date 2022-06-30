import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

export interface LoadingState {
  message: string;
  status: 'loading' | 'ready';
}

const initialState: LoadingState = {
  message: '',
  status: 'ready',
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loading: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.status = 'loading';
    },
    ready: state => {
      state.message = '';
      state.status = 'ready';
    },
  },
});

export const { loading, ready } = loadingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLoading = (state: RootState) => state.loading.status;
export default loadingSlice.reducer;

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectIsLoggedIn } from '@/features/Authentication/userSlice';
import { authenticationApi } from '@/features/Authentication/authenticationApi';

const useAuthenticated = (): boolean => {
  const isAuthenticated = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('this is happening?');
    dispatch(authenticationApi.endpoints.getMe.initiate());
  }, []);

  return isAuthenticated;
};

export default useAuthenticated;

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchMyUser } from '@/features/Authentication/myuserApi';
import { selectIsLoggedIn } from '@/features/Authentication/userSlice';

const useAuthenticated = (): boolean => {
  const isAuthenticated = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyUser());
  }, []);

  return isAuthenticated;
};

export default useAuthenticated;

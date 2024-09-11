import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { logout } from '../authenticationApi';

import Spinner from '@/components/Spinner';

export const Logout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logout);
  }, []);

  return <Spinner variant="large" />;
};

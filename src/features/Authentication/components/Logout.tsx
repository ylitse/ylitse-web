import { useEffect } from 'react';
import { authenticationApi } from '../authenticationApi';
import { useAppDispatch } from '@/store';
import Spinner from '@/components/Spinner';

export const Logout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticationApi.endpoints.logout.initiate());
  }, []);

  return <Spinner variant="large" />;
};

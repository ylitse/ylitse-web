import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { authenticationApi } from '../authenticationApi';

import Spinner from '@/components/Spinner';

export const Logout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticationApi.endpoints.logout.initiate());
  }, []);

  return <Spinner variant="large" />;
};

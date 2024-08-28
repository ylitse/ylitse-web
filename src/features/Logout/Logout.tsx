import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { authenticationApi } from '../Authentication/authenticationApi';

import Spinner from '@/components/Spinner';

const Logout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticationApi.endpoints.logout.initiate());
  }, []);

  return <Spinner variant="large" />;
};

export default Logout;

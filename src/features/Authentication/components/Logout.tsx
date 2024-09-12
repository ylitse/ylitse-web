import { useEffect } from 'react';
import { useLogoutMutation } from '../authenticationApi';

import Spinner from '@/components/Spinner';

export const Logout = () => {
  const [logout] = useLogoutMutation();

  useEffect(() => {
    logout();
  }, []);

  return <Spinner variant="large" />;
};

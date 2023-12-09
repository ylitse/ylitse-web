import { useEffect } from 'react';
import Spinner from '@/components/Spinner';

const Logout = () => {
  useEffect(() => {
    const logoutSession = async () => {
      try {
        const response = await fetch('/api/logout');
        if (response.ok) {
          window.location.href = '/login/';
        }
      } catch (error) {
        console.error(error);
      }
    };
    logoutSession();
  }, []);

  return <Spinner variant="large" />;
};

export default Logout;

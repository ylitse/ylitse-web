import Spinner from '@/components/Spinner';
import { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    const logoutSession = async () => {
      sessionStorage.setItem('user', '');
      try {
        await fetch('/api/logout');
        window.location.href = '/login';
      } catch (error) {
        console.error(error);
      }
    };
    logoutSession();
  }, []);

  return <Spinner variant="large" />;
};

export default Logout;

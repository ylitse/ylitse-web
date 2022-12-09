import { useEffect, useState } from 'react';

const useAuthenticated = (): boolean => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateUser = async () => {
    const response = await fetch('/api/myuser');
    if (response.redirected) {
      // If there is no active session, the user is redirected to the login page
      window.location.href = response.url;
    } else if (response.ok) {
      setIsAuthenticated(true);
    } else {
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return isAuthenticated;
};

export default useAuthenticated;

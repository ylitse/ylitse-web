import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '@/features/Navigation';
import Footer from '@/components/Footer';
import MentorPage from '@/features/MentorPage';
import Logout from '@/features/Logout';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const authenticateUser = async () => {
      const response = await fetch('/api/myuser');
      if (response.redirected) {
        // If there is no active session, the user is redirected to the login page
        window.location.href = response.url;
      } else if (response.ok) {
        setAuthenticated(true);
      } else {
        window.location.href = '/login';
      }
    };
    authenticateUser();
  }, []);

  return (
    <>
      {authenticated && (
        <div>
          <Navigation />
          <Routes>
            <Route path="/mentors" element={<MentorPage />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;

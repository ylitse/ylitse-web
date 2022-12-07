import { Routes, Route } from 'react-router-dom';
import Navigation from '@/features/Navigation';
import Footer from '@/components/Footer';
import MentorPage from '@/features/MentorPage';
import Logout from '@/features/Logout';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const session = sessionStorage.getItem('user');
    if (!session) window.location.href = '/login';
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/mentors" element={<MentorPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

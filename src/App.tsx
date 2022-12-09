import { Routes, Route } from 'react-router-dom';
import Navigation from '@/features/Navigation';
import Footer from '@/components/Footer';
import MentorPage from '@/features/MentorPage';
import Logout from '@/features/Logout';
import useAuthenticated from './hooks/useAuthenticated';

function App() {
  const isAuthenticated = useAuthenticated();

  return (
    <>
      {isAuthenticated && (
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

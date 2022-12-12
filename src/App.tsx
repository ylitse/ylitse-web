import { Routes, Route } from 'react-router-dom';
import Navigation from '@/features/Navigation';
import Footer from '@/components/Footer';
import MentorPage from '@/features/MentorPage';
import Logout from '@/features/Logout';
import Spinner from './components/Spinner';
import styled from 'styled-components';

import useAuthenticated from './hooks/useAuthenticated';

const App = () => {
  const isAuthenticated = useAuthenticated();

  return isAuthenticated ? (
    <AppWrapper>
      <Navigation />
      <Routes>
        <Route path="/mentors" element={<MentorPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </AppWrapper>
  ) : (
    <Spinner variant="large" />
  );
};

const AppWrapper = styled.div`
  overflow: hidden;
`;

export default App;

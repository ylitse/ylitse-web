import { Routes, Route } from 'react-router-dom';
import Navigation from '@/features/Navigation';
import Footer from '@/features/Footer';
import MentorPage from '@/features/MentorPage';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/mentors" element={<MentorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

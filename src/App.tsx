import { Routes, Route } from 'react-router-dom';
import Navigation from '@/features/Navigation';
import Footer from '@/features/Footer';
import MentorPage from '@/features/MentorPage';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
<<<<<<< HEAD
        <Route path="/mentors" element={<MentorPage />} />
=======
        <Route path="/register" element={<RegisterPage />} />
				<Route path="/mentors" element={<MentorPage />} />
>>>>>>> 1fe3cc8 (Fixed route endpoint)
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

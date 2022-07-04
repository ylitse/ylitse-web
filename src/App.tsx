import { Routes, Route } from 'react-router-dom';
import RegisterPage from '@/features/RegisterPage';
import Navigation from '@/features/Navigation';
import MentorPage from '@/features/MentorPage';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
				<Route path="/mentorit" element={<MentorPage />} />
      </Routes>
    </div>
  );
}

export default App;

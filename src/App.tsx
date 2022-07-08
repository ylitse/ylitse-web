import { Routes, Route } from 'react-router-dom';
import RegisterPage from '@/features/RegisterPage';
import Navigation from '@/features/Navigation';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;

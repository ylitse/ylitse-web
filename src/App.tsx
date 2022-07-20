import { Routes, Route } from 'react-router-dom';
import RegisterPage from '@/features/RegisterPage';
import Navigation from '@/features/Navigation';
import Footer from '@/features/Footer';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
			<Footer/>
    </div>
  );
}

export default App;

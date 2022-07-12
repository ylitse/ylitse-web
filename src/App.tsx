import { Routes } from 'react-router-dom';
import Navigation from '@/features/Navigation';
import Footer from '@/features/Footer';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
				<Route path="/mentors" element={<MentorPage />} />
      </Routes>
			<Footer/>
    </div>
  );
}

export default App;

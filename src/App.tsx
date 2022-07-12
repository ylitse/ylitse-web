import { Routes, Route } from 'react-router-dom';
import RegisterPage from '@/features/RegisterPage';
import Footer from '@/features/Footer';

const Wrapper = styled.section``;

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

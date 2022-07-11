import { Routes } from 'react-router-dom';
import Navigation from '@/features/Navigation';
import Footer from '@/features/Footer';

function App() {
  return (
    <div>
      <Navigation />
      <Routes></Routes>
      <Footer />
    </div>
  );
}

export default App;

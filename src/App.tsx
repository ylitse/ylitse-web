import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import RegisterPage from '@/features/RegisterPage';
import Navigation from '@/features/Navigation';

const Wrapper = styled.section``;

function App() {
  return (
    <div>
			<Navigation/>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;

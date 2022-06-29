import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import RegisterPage from './features/RegisterPage';
import IndexPage from './features/IndexPage';

const Wrapper = styled.section``;

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
				<Route path="/" element={<IndexPage />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route, Link } from "react-router-dom";
import styled from 'styled-components';
import RegisterPage from '@features/RegisterPage';

const Wrapper = styled.section``;

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;

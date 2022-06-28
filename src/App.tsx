import { Routes, Route, Link } from "react-router-dom";
import NavigationBar from './features/Navigation';

import styled from 'styled-components';
import RegisterPage from './features/RegisterPage';

const Wrapper = styled.section``;

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NavigationBar />} />
      </Routes>
    </div>
  );
}

export default App;

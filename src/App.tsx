import { Routes, Route, Link } from "react-router-dom";
import HomePage from './features/HomePage';
import MentorPage from './features/MentorPage';

import styled from 'styled-components';
import RegisterPage from './features/RegisterPage';

const Wrapper = styled.section``;

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
				<Route path="/mentorit" element={<MentorPage />} />
      </Routes>
    </div>
  );
}

export default App;

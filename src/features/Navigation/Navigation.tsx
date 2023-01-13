import { Navbar } from './Navbar';
import { Routes, Route } from 'react-router-dom';

import ChatPage from '@/features/Chat';
import MentorPage from '@/features/MentorPage';
import Logout from '@/features/Logout';

const Navigation = () => (
  <>
    <Navbar />

    <Routes>
      <Route path="/*" element={<div>KOTISIVU</div>} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/mentors" element={<MentorPage />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </>
);
export default Navigation;

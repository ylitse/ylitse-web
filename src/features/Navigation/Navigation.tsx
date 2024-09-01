import { Route, Routes } from 'react-router-dom';

import ChatPage from '@/features/Chat';
import HomePage from '@/features/HomePage';
import Logout from '@/features/Authentication/Logout';
import MentorPage from '@/features/MentorPage';
import { Navbar } from './Navbar';

const Navigation = () => (
  <>
    <Navbar />

    <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/mentors" element={<MentorPage />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </>
);
export default Navigation;

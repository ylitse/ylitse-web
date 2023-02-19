import { Route, Routes } from 'react-router-dom';

import ChatPage from '@/features/Chat';
import Logout from '@/features/Logout';
import MentorPage from '@/features/MentorPage';
import { Navbar } from './Navbar';

const Navigation = () => (
  <>
    <Navbar />

    <Routes>
      <Route path="*" element={<div>KOTISIVU</div>} />
      <Route path="chat" element={<ChatPage />} />
      <Route path="mentors" element={<MentorPage />} />
      <Route path="logout" element={<Logout />} />
    </Routes>
  </>
);
export default Navigation;

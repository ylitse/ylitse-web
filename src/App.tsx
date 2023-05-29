import { useAppSelector } from './store';
import useAuthenticated from './hooks/useAuthenticated';
import { selectUserId } from './features/Authentication/userSlice';
import {
  useGetContactsQuery,
  useGetMessagesQuery,
} from './features/Chat/chatPageApi';
import { selectCurrentPollingParams } from './features/Chat/chatSlice';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import Navigation from './features/Navigation';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import styled from 'styled-components';

const App = () => {
  const isAuthenticated = useAuthenticated();

  const userId = useAppSelector(selectUserId);
  const params = useAppSelector(selectCurrentPollingParams);
  const messageParams = !!params && !!userId ? { params, userId } : skipToken;

  useGetContactsQuery(userId ?? skipToken);
  useGetMessagesQuery(messageParams, {
    pollingInterval: 5000,
  });

  return isAuthenticated ? (
    <AppWrapper>
      <Navigation />
      <Footer />
    </AppWrapper>
  ) : (
    <Spinner variant="large" />
  );
};

const AppWrapper = styled.div`
  overflow: hidden;
`;

export default App;

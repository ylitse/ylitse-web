import styled from 'styled-components';
import { useState } from 'react';
import PageWithTransition from '@/components/PageWithTransition';
import Spinner from '@/components/Spinner';
import ChatMenu from './ChatMenu';
import ChatWindow from './ChatWindow';
import { useMobileMode } from '@/hooks/useMobileMode';

const ChatPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMobileMode();

  return (
    <PageWithTransition>
      {isLoading ? (
        <Spinner variant="large" />
      ) : isMobile ? (
        <ChatMenu />
      ) : (
        <ChatContainer isMobile={isMobile}>
          <ChatMenu />
          <ChatWindow />
        </ChatContainer>
      )}
    </PageWithTransition>
  );
};

const ChatContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 22px;
`;

export default ChatPage;

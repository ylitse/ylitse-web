import styled, { css } from 'styled-components';

import ChatMenu from './ChatMenu';
import ChatWindow from './ChatWindow';
import PageWithTransition from '@/components/PageWithTransition';
import Spinner from '@/components/Spinner';

import { useMobileMode } from '@/hooks/useMobileMode';

const ChatPage = () => {
  const isMobile = useMobileMode();
  const isLoading = false;

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
  ${({ isMobile }) =>
    isMobile
      ? css`
          width: 100vw;
        `
      : css`
          gap: 22px;
        `};
`;

export default ChatPage;

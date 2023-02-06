import styled, { css } from 'styled-components';

import { useMobileMode } from '@/hooks/useMobileMode';

import ChatMenu from './ChatMenu';
import ChatWindow from './ChatWindow';
import { CONTENT_HEIGHT } from '@/components/variables';
import PageWithTransition from '@/components/PageWithTransition';
import Spinner from '@/components/Spinner';

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
  ${({ isMobile }) =>
    isMobile
      ? css`
          width: 100vw;
        `
      : css`
          display: flex;
          gap: 22px;
          height: ${CONTENT_HEIGHT};
          justify-content: center;
        `};
`;

export default ChatPage;

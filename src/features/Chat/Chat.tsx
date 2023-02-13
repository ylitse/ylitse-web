import styled, { css } from 'styled-components';

import { useMobileMode } from '@/hooks/useMobileMode';

import ChatMenu from './ChatMenu';
import ChatWindow from './ChatWindow';
import {
  breakpoints,
  CONTENT_HEIGHT,
  CONTENT_WIDTH,
  OUTER_VERTICAL_MARGIN,
} from '@/components/variables';
import PageWithTransition from '@/components/PageWithTransition';
import Spinner from '@/components/Spinner';

const ChatPage = () => {
  const isMobile = useMobileMode();
  const isLoading = false;

  return (
    <PageWithTransition>
      <PageContainer isMobile={isMobile}>
        {isLoading ? (
          <Spinner variant="large" />
        ) : (
          <ChatContainer>
            <ChatMenu />
            <ChatWindow />
          </ChatContainer>
        )}
      </PageContainer>
    </PageWithTransition>
  );
};

const PageContainer = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    isMobile
      ? css`
          width: 100vw;
        `
      : css`
          display: flex;
          flex-direction: column;
          margin: ${OUTER_VERTICAL_MARGIN} auto;
          max-width: ${CONTENT_WIDTH};
          width: ${CONTENT_WIDTH};
        `}
  @media screen and (max-width: ${breakpoints.mobile}) {
    flex: 1;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  gap: 22px;
  height: ${CONTENT_HEIGHT};
  justify-content: center;
  min-height: 400px;
`;

export default ChatPage;

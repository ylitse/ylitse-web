import { useGetContactsQuery, useGetMessagesQuery } from './chatPageApi';
import { useAppSelector } from '@/store';
import { selectUserId } from '../Authentication/userSlice';
import { selectCurrentPollingParams } from './chatSlice';

import { useMobileMode } from '@/hooks/useMobileMode';

import styled, { css } from 'styled-components';
import {
  breakpoints,
  CONTENT_HEIGHT,
  CONTENT_WIDTH,
  OUTER_VERTICAL_MARGIN,
} from '@/components/variables';
import ChatMenu from './components/ChatMenu';
import ChatWindow from './components/ChatWindow';
import PageWithTransition from '@/components/PageWithTransition';

const ChatPage = () => {
  const isMobile = useMobileMode();

  const userId = useAppSelector(selectUserId);
  const params = useAppSelector(selectCurrentPollingParams);

  // Improve
  useGetContactsQuery(userId!, { skip: !userId });
  useGetMessagesQuery(
    { userId: userId!, params: params! },
    { skip: !userId || !params },
  );

  return (
    <PageWithTransition>
      <PageContainer isMobile={isMobile}>
        <ChatContainer>
          <ChatMenu />
          <ChatWindow />
        </ChatContainer>
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

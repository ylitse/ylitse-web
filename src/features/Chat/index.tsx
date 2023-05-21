import { useGetContactsQuery, useGetMessagesQuery } from './chatPageApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
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
import ChatMenu from './components/Menu';
import ChatWindow from './components/Window';
import PageWithTransition from '@/components/PageWithTransition';

const Chat = () => {
  const isMobile = useMobileMode();

  const userId = useAppSelector(selectUserId);
  const params = useAppSelector(selectCurrentPollingParams);
  const messageParams = !!params && !!userId ? { params, userId } : skipToken;

  useGetContactsQuery(userId ?? skipToken);
  useGetMessagesQuery(messageParams, {
    pollingInterval: 5000,
  });

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

export default Chat;

import { useAppSelector } from '@/store';
import {
  selectActiveChat,
  selectIsLoadingBuddyMessages,
} from '@/features/Chat/chatSlice';
import { useSendMessageMutation } from '@/features/Chat/chatPageApi';
import { useMobileMode } from '@/hooks/useMobileMode';
import { useTabletMode } from '@/hooks/useTabletMode';

import styled, { css } from 'styled-components';
import {
  CHAT_MIN_HEIGHT,
  CHAT_MIN_HEIGHT_TABLET,
  CHAT_WINDOW_MIN_WIDTH,
} from '@/features/Chat/constants';
import Header from './Header';
import MessageField from './MessageField';
import MessageList from './MessageList';
import {
  CONTENT_HEIGHT,
  MOBILE_CONTENT_HEIGHT,
  palette,
  TABLET_CONTENT_HEIGHT,
} from '@/components/variables';

const ActiveWindow = () => {
  const isMobile = useMobileMode();
  const isTablet = useTabletMode();
  const chat = useAppSelector(selectActiveChat);

  const [sendMessage, { isLoading: isLoadingSendMessage }] =
    useSendMessageMutation();

  const isLoadingMessages = useAppSelector(
    selectIsLoadingBuddyMessages(chat?.buddyId),
  );

  const isLoading = isLoadingSendMessage || isLoadingMessages;

  return (
    chat && (
      <Container isMobile={isMobile} isTablet={isTablet}>
        <Header chat={chat} />
        <MessageList
          messageList={chat.messages}
          buddyId={chat.buddyId}
          status={chat.status}
          isLoading={isLoading}
        />
        {chat.status === 'ok' && (
          <MessageField
            chat={chat}
            sendMessage={sendMessage}
            isMessageSendLoading={isLoadingSendMessage}
          />
        )}
      </Container>
    )
  );
};

const Container = styled.div<{ isMobile: boolean; isTablet: boolean }>`
  background-color: ${palette.white};
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  ${({ isMobile, isTablet }) =>
    isMobile
      ? css`
          height: ${MOBILE_CONTENT_HEIGHT};
          min-height: ${CHAT_MIN_HEIGHT_TABLET};
        `
      : isTablet
      ? css`
          height: ${TABLET_CONTENT_HEIGHT};
          min-height: ${CHAT_MIN_HEIGHT_TABLET};
        `
      : css`
          border-radius: 10px;
          height: ${CONTENT_HEIGHT};
          min-height: ${CHAT_MIN_HEIGHT};
          min-width: ${CHAT_WINDOW_MIN_WIDTH};
        `}
`;

export default ActiveWindow;

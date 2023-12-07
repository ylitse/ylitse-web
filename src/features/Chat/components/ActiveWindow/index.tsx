// Libraries
import styled, { css } from 'styled-components';

// Store and hooks
import {
  selectActiveChat,
  selectIsLoadingBuddyMessages,
} from '@/features/Chat/chatSlice';
import { useAppSelector } from '@/store';
import { useSendMessageMutation } from '@/features/Chat/chatPageApi';
import { useTabletMode } from '@/hooks/useTabletMode';

// Variables
import {
  CHAT_MIN_HEIGHT,
  CHAT_WINDOW_MIN_WIDTH,
} from '@/features/Chat/constants';
import {
  DESKTOP_CONTENT_HEIGHT,
  MOBILE_AND_TABLET_CONTENT_HEIGHT,
  palette,
} from '@/components/variables';

// Components
import Header from './Header';
import MessageField from './MessageField';
import MessageList from './MessageList';

const ActiveWindow = () => {
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
      <Container isTablet={isTablet}>
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

const Container = styled.div<{ isTablet: boolean }>`
  background-color: ${palette.white};
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  ${({ isTablet }) =>
    css`
      border-radius: 10px;
      height: ${isTablet
        ? MOBILE_AND_TABLET_CONTENT_HEIGHT
        : DESKTOP_CONTENT_HEIGHT};
      min-height: ${CHAT_MIN_HEIGHT};
      min-width: ${CHAT_WINDOW_MIN_WIDTH};
    `}
`;

export default ActiveWindow;

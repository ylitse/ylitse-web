import { useAppSelector } from '@/store';
import {
  selectActiveChat,
  selectIsLoadingBuddyMessages,
} from '@/features/Chat/chatSlice';
import { useSendMessageMutation } from '@/features/Chat/chatPageApi';

import styled from 'styled-components';
import {
  CHAT_MIN_HEIGHT,
  CHAT_WINDOW_MIN_WIDTH,
} from '@/features/Chat/constants';
import Header from './Header';
import MessageField from './MessageField';
import MessageList from './MessageList';
import { CONTENT_HEIGHT, palette } from '@/components/variables';

const ActiveWindow = () => {
  const chat = useAppSelector(selectActiveChat);

  const [sendMessage, { isLoading: isLoadingSendMessage }] =
    useSendMessageMutation();

  const isLoadingMessages = useAppSelector(
    selectIsLoadingBuddyMessages(chat?.buddyId),
  );

  const isLoading = isLoadingSendMessage || isLoadingMessages;

  return (
    chat && (
      <Container>
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

const Container = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: ${CONTENT_HEIGHT};
  min-height: ${CHAT_MIN_HEIGHT};
  min-width: ${CHAT_WINDOW_MIN_WIDTH};
`;

export default ActiveWindow;

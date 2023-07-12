import { useSendMessageMutation } from '@/features/Chat/chatPageApi';
import { useAppSelector } from '@/store';
import {
  selectActiveChat,
  selectIsLoadingBuddyMessages,
} from '@/features/Chat/chatSlice';

import styled from 'styled-components';
import Header from './Header';
import MessageField from './MessageField';
import MessageList from './MessageList';
import { palette } from '@/components/variables';

const ActiveWindow = () => {
  const [isLoading] = useSendMessageMutation();

  const chat = useAppSelector(selectActiveChat);
  const isLoadingMessages = useAppSelector(
    selectIsLoadingBuddyMessages(chat?.buddyId),
  );

  const loading = !!isLoading || isLoadingMessages;

  return (
    chat && (
      <Container>
        <Header chat={chat} />
        <MessageList
          messageList={chat.messages}
          buddyId={chat.buddyId}
          status={chat.status}
          isLoading={loading}
        />
        <MessageField chat={chat} />
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
  height: 100%;
`;

export default ActiveWindow;

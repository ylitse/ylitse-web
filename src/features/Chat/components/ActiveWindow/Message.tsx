import { useEffect } from 'react';

import { useAppSelector } from '@/store';
import { selectUserId } from '@/features/Authentication/userSlice';

import {
  AppMessage,
  ChatFolder,
  toPutMessage,
  useMarkSeenMutation,
} from '@/features/Chat/chatPageApi';

import styled from 'styled-components';
import { messageBackgroundColors } from '@/components/variables';
import Text from '@/components/Text';

const toReadable = (timestamp: string) =>
  new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

type Props = {
  folder: ChatFolder;
  buddyId: string;
  message: AppMessage;
};

export const Message = ({ folder, buddyId, message }: Props) => {
  const [markSeen] = useMarkSeenMutation();
  const userId = useAppSelector(selectUserId);

  const handleMarkSeen = () => {
    if (!userId) return;

    markSeen({ userId, message: toPutMessage(message, buddyId, userId) });
  };

  useEffect(() => {
    if (!message.opened) {
      handleMarkSeen();
    }
  }, []);

  const background =
    messageBackgroundColors[folder][message.isSent ? 'sent' : 'received'];

  return (
    <Container isSent={message.isSent}>
      <Bubble background={background}>
        <Content>{message.content}</Content>
      </Bubble>
      <Timestamp isSent={message.isSent}>
        {toReadable(message.created)}
      </Timestamp>
    </Container>
  );
};

const Container = styled.div<{ isSent: boolean }>`
  align-items: ${({ isSent }) => (isSent ? 'flex-end' : 'flex-start')};
  display: flex;
  flex-direction: column;
`;

const Bubble = styled.div<{
  background: string;
}>`
  background-color: ${({ background }) => background};
  border-radius: 10px;
  box-sizing: border-box;
  padding: 14px 22px;
  text-align: left;
  word-break: break-word;
`;

const Content = styled(Text)`
  margin: 0;
`;

const Timestamp = styled(Text)<{ isSent: boolean }>`
  ${({ isSent }) => (isSent ? 'margin-right: 14px;' : 'margin-left: 14px;')}
  margin-bottom: 0;
  margin-top: 0;
  text-align: right;
`;

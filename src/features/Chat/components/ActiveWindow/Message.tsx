import { useEffect, useRef } from 'react';

import { useAppSelector } from '@/store';
import { selectUserId } from '@/features/Authentication/userSlice';
import { useIsVisible } from '@/hooks/useIsVisible';

import {
  AppMessage,
  ChatFolder,
  toPutMessage,
  useMarkSeenMutation,
} from '@/features/Chat/chatPageApi';

import styled from 'styled-components';
import { messageColors } from '@/features/Chat/constants';
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
  const ref = useRef(null);
  const isVisible = useIsVisible<HTMLDivElement>(ref);

  const handleMarkSeen = () => {
    if (!userId) return;

    // console.log('NotOpened', message.content);
    // console.log('Visibility', isVisible);
    markSeen({ userId, message: toPutMessage(message, buddyId, userId) });
  };

  useEffect(() => {
    const shouldMarkUnseen = !message.isSent && !message.opened && isVisible;
    if (shouldMarkUnseen) {
      handleMarkSeen();
    }
  }, [isVisible]);

  const background =
    messageColors[folder][message.isSent ? 'sent' : 'received'];

  return (
    <Container isSent={message.isSent} isVisible={isVisible} ref={ref}>
      <Bubble background={background}>
        <Content>{message.content}</Content>
      </Bubble>
      <Timestamp isSent={message.isSent}>
        {toReadable(message.created)}
      </Timestamp>
    </Container>
  );
};

const Container = styled.div<{ isSent: boolean; isVisible: boolean }>`
  align-items: ${({ isSent }) => (isSent ? 'flex-end' : 'flex-start')};
  border: ${({ isVisible }) => `1px solid ${isVisible ? 'green' : 'red'}`};
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

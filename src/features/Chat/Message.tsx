import styled from 'styled-components';

import { palette } from '@/components/variables';
import Text from '@/components/Text';

type Props = {
  isSeen: boolean;
  isSent: boolean;
  message: string;
  sentTime: number;
};

// Convert unix timestamp to time string hh:mm
const getSentTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
};

const Message = ({ isSent, message, sentTime }: Props) => {
  return (
    <MessageContainer isSent={isSent}>
      <MessageBubble isSent={isSent}>
        <Text variant="simpleSource">{message}</Text>
      </MessageBubble>
      <MessageTime variant="simpleSource">{getSentTime(sentTime)}</MessageTime>
    </MessageContainer>
  );
};

const MessageContainer = styled.div<{ isSent: boolean }>`
  align-items: ${({ isSent }) => (isSent ? 'flex-end' : 'flex-start')};
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const MessageBubble = styled.div<{ isSent: boolean }>`
  background-color: ${({ isSent }) =>
    isSent ? palette.blueLight : palette.blueWhite};
  border-radius: 10px;
  box-sizing: border-box;
  padding: 14px 22px;
  text-align: left;
  word-break: break-word;
`;

const MessageTime = styled(Text)`
  margin-top: 5px;
  text-align: right;
`;

export default Message;

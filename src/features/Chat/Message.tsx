import styled from 'styled-components';

import { palette } from '@/components/variables';
import Text from '@/components/Text';

type Props = {
  opened: boolean;
  isSent: boolean;
  message: string;
  sentTime: string;
};

// Convert unix timestamp string to time string hh:mm
const getSentTime = (sentTime: string) => {
  const date = new Date(parseInt(sentTime, 10) * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hoursString}:${minutesString}`;
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

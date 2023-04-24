import styled from 'styled-components';

import { palette } from '@/components/variables';
import Text from '@/components/Text';

type Props = {
  opened: boolean;
  isSent: boolean;
  message: string;
  sentTime: string;
};

// This function takes an ISO 8601 timestamp and returns a string in the format hh:mm
const getSentTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hoursString}:${minutesString}`;
};

const Message = ({ isSent, message, sentTime }: Props) => (
  <MessageContainer isSent={isSent}>
    <MessageBubble isSent={isSent}>
      <Content>{message}</Content>
    </MessageBubble>
    <MessageTime isSent={isSent}>{getSentTime(sentTime)}</MessageTime>
  </MessageContainer>
);

const MessageContainer = styled.div<{ isSent: boolean }>`
  align-items: ${({ isSent }) => (isSent ? 'flex-end' : 'flex-start')};
  display: flex;
  flex-direction: column;
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

const Content = styled(Text)`
  margin: 0;
`;

const MessageTime = styled(Text)<{ isSent: boolean }>`
  ${({ isSent }) => (isSent ? 'margin-right: 14px;' : 'margin-left: 14px;')}
  margin-bottom: 0;
  margin-top: 0;
  text-align: right;
`;

export default Message;

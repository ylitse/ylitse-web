import styled from 'styled-components';

import type { ChatCategory } from './chatSlice';

import { palette } from '@/components/variables';
import Text from '@/components/Text';

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return formattedTime;
};

type Props = {
  category: ChatCategory;
  content: string;
  isSent: boolean;
  time: string;
};
const Message = ({ category, content, isSent, time }: Props) => (
  <MessageContainer isSent={isSent}>
    <MessageBubble category={category} isSent={isSent}>
      <Content>{content}</Content>
    </MessageBubble>
    <MessageTime isSent={isSent}>{formatTime(time)}</MessageTime>
  </MessageContainer>
);

const MessageContainer = styled.div<{ isSent: boolean }>`
  align-items: ${({ isSent }) => (isSent ? 'flex-end' : 'flex-start')};
  display: flex;
  flex-direction: column;
`;

const MessageBubble = styled.div<{ category: ChatCategory; isSent: boolean }>`
  background-color: ${({ category, isSent }) => {
    if (category === 'active')
      return isSent ? palette.blueLight : palette.blueWhite;
    if (category === 'archived')
      return isSent ? palette.orangeLight : palette.orangeWhite;
    return isSent ? palette.redSalmon : palette.redWhite;
  }};
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

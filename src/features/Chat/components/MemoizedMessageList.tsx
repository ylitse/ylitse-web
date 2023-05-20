import { memo, useEffect, useRef } from 'react';

import type { Message as MessageType } from '../chatPageApi';
import type { ChatFolder } from '../chatSlice';

import styled from 'styled-components';
import { palette } from '@/components/variables';

import Message from './Message';
import Text from '@/components/Text';

type Props = {
  messageList: Array<MessageType>;
  status: ChatFolder;
  id: string;
  isLoading: boolean;
};

type GroupedMessages = Record<string, MessageType[]>;

const toGroupedMessages = (messages: Array<MessageType>) =>
  messages.reduce<GroupedMessages>(
    (grouped: GroupedMessages, current: MessageType) => {
      const messageDate = new Date(current.created).toLocaleDateString(
        'fi-FI',
        {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        },
      );

      const existingGroup = grouped[messageDate] ?? [];
      const nextMessages = existingGroup.concat(current);

      return { ...grouped, [messageDate]: nextMessages };
    },
    {},
  );

const MessageList = ({ messageList, status, id }: Props) => {
  const groupedMessages = toGroupedMessages(messageList);

  // Scroll to the bottom of the chat when a new message is sent
  const historyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    historyRef.current?.lastElementChild?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messageList]);

  useEffect(() => {
    historyRef.current?.lastElementChild?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messageList]);

  return (
    <ChatHistory ref={historyRef}>
      {Object.keys(groupedMessages).map(date => (
        <>
          <DateDivider>{date}</DateDivider>
          {groupedMessages[date].map(message => (
            <Message
              key={message.id}
              folder={status}
              content={message.content}
              isSent={message.recipient_id === id}
              time={message.created}
            />
          ))}
        </>
      ))}
    </ChatHistory>
  );
};

const equalProps = (
  prevProps: React.ComponentProps<typeof MessageList>,
  nextProps: React.ComponentProps<typeof MessageList>,
) =>
  prevProps.messageList.length === nextProps.messageList.length &&
  prevProps.isLoading === nextProps.isLoading;

export const MemoizedMessageList = memo(MessageList, equalProps);

const ChatHistory = styled.div`
  border-bottom: 1px solid ${palette.greyLight};
  flex: 1;
  overflow: auto;
  padding: 0px 40px 10px;
`;

const DateDivider = styled(Text)`
  position: relative;
  text-align: center;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background-color: ${palette.purple}};
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
`;

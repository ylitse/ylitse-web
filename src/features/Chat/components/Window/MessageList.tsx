import { useEffect, useRef, Fragment } from 'react';

import { useAppDispatch } from '@/store';
import { addPollParam } from '../../chatSlice';

import type { AppMessage, ChatFolder } from '../../chatPageApi';
import { useScrollToTop } from '@/hooks/useScrollToTop';

import styled from 'styled-components';
import { palette } from '@/components/variables';
import { Message } from './Message';
import Text from '@/components/Text';
import Spinner from '@/components/Spinner';

type Props = {
  messageList: Array<AppMessage>;
  status: ChatFolder;
  buddyId: string;
  isLoading: boolean;
};

type GroupedMessages = Record<string, AppMessage[]>;

const toGroupedMessages = (messages: Array<AppMessage>) =>
  messages.reduce<GroupedMessages>(
    (grouped: GroupedMessages, current: AppMessage) => {
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

export const MessageList = ({
  messageList,
  status,
  buddyId,
  isLoading,
}: Props) => {
  const groupedMessages = toGroupedMessages(messageList);

  const dispatch = useAppDispatch();
  const oldestMessage = messageList.length > 0 ? messageList[0].id : '0';
  const newestMessage =
    messageList.length > 0 ? messageList[messageList.length - 1].id : '0';

  const handleFetchOlderMessages = (messageId: string, buddyId: string) => {
    if (isLoading) {
      return;
    }

    dispatch(addPollParam({ type: 'OlderThan', buddyId, messageId }));
  };

  // Scroll to the bottom of the chat when a new message is sent
  const historyRef = useRef<HTMLDivElement>(null);

  const { isScrolledToTop } = useScrollToTop({
    ref: historyRef,
  });

  useEffect(() => {
    historyRef.current?.lastElementChild?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [newestMessage]);

  useEffect(() => {
    if (isScrolledToTop) {
      handleFetchOlderMessages(oldestMessage, buddyId);
    }
  }, [isScrolledToTop]);

  return (
    <ChatHistory ref={historyRef}>
      {isLoading && <Spinner variant="small" isDark />}
      {Object.keys(groupedMessages).map(date => (
        <Fragment key={date}>
          <DateDivider>{date}</DateDivider>
          {groupedMessages[date].map(message => (
            <Message
              key={message.id}
              folder={status}
              content={message.content}
              isSent={message.isSent}
              time={message.created}
            />
          ))}
        </Fragment>
      ))}
    </ChatHistory>
  );
};

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

import { useEffect, useRef, Fragment } from 'react';
import type { AppMessage, ChatFolder } from '@/features/Chat/models';

import { useAppDispatch } from '@/store';
import { addPollParam } from '@/features/Chat/chatSlice';

import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import styled, { css } from 'styled-components';
import { palette } from '@/components/constants';
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

const MessageList = ({ messageList, status, buddyId, isLoading }: Props) => {
  const { isTablet } = useGetLayoutMode();
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
          <DateDivider isTablet={isTablet}>{date}</DateDivider>
          <Messages>
            {groupedMessages[date].map(message => (
              <Message
                key={message.id}
                folder={status}
                buddyId={buddyId}
                message={message}
              />
            ))}
          </Messages>
        </Fragment>
      ))}
    </ChatHistory>
  );
};

const ChatHistory = styled.div`
  border-bottom: 1px solid ${palette.greyLight};
  flex: 1;
  overflow: auto;
  padding-bottom: 10px;
`;

const DateDivider = styled(Text)<{ isTablet: boolean }>`
  position: relative;
  text-align: center;
  ${({ isTablet }) =>
    !isTablet &&
    css`
      margin-left: 40px;
      margin-right: 40px;
    `}

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: ${({ isTablet }) => (isTablet ? '30%' : '40%')};
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

const Messages = styled.div`
  padding-left: 40px;
  padding-right: 40px;
`;

export default MessageList;

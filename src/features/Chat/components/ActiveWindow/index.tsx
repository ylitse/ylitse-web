import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import {
  selectActiveChat,
  selectIsLoadingBuddyMessages,
  selectDefaultChat,
} from '@/features/Chat/selectors';
import { selectUserId } from '@/features/Authentication/selectors';
import { setActiveChat } from '@/features/Chat/chatSlice';
import {
  toSendMessage,
  useSendMessageMutation,
} from '@/features/Chat/chatPageApi';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import {
  CHAT_MIN_HEIGHT,
  CHAT_WINDOW_MIN_WIDTH,
} from '@/features/Chat/constants';
import {
  DESKTOP_CONTENT_HEIGHT,
  MOBILE_AND_TABLET_CONTENT_HEIGHT,
  palette,
} from '@/components/constants';
import Header from './Header';
import MessageField from './MessageField';
import MessageList from './MessageList';

const ActiveWindow = () => {
  const { isTablet } = useGetLayoutMode();
  const dispatch = useAppDispatch();
  const [sendMessage, { isLoading: isLoadingSendMessage }] =
    useSendMessageMutation();
  const userId = useAppSelector(selectUserId);

  const activeChat = useAppSelector(selectActiveChat);
  const defaultChat = useAppSelector(selectDefaultChat);
  const chat = activeChat ?? defaultChat;

  const [message, setMessage] = useState('');

  const isLoadingMessages = useAppSelector(
    selectIsLoadingBuddyMessages(chat?.buddyId),
  );
  const isLoading = isLoadingMessages || isLoadingSendMessage;

  const [isLoadingNewMessage, setIsLoadingNewMessage] = useState(false);
  const isSendingDisabled = isLoadingNewMessage || message.trim().length < 1;

  const handleMessageSend = async () => {
    if (!userId || isLoadingNewMessage) return;

    setIsLoadingNewMessage(true);
    try {
      await sendMessage({
        userId,
        message: toSendMessage(chat.buddyId, userId, message),
      }).unwrap();
    } catch (error) {
      setIsLoadingNewMessage(false);
    }
  };

  useEffect(() => {
    dispatch(setActiveChat(chat.buddyId));
    setMessage('');
  }, [chat.buddyId]);

  useEffect(() => {
    if (isLoadingNewMessage) {
      setMessage('');
      setIsLoadingNewMessage(false);
    }
  }, [chat.messages]);

  return (
    chat && (
      <Container isTablet={isTablet}>
        <Header chat={chat} />
        <MessageList
          messageList={chat.messages}
          buddyId={chat.buddyId}
          status={chat.status}
          isLoading={isLoading}
        />
        {chat.status === 'ok' && (
          <MessageField
            handleSend={handleMessageSend}
            isInputDisabled={isLoadingNewMessage}
            isSendDisabled={isSendingDisabled}
            message={message}
            onChange={setMessage}
          />
        )}
      </Container>
    )
  );
};

const Container = styled.div<{ isTablet: boolean }>`
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: ${({ isTablet }) =>
    isTablet ? MOBILE_AND_TABLET_CONTENT_HEIGHT : DESKTOP_CONTENT_HEIGHT};
  min-height: ${CHAT_MIN_HEIGHT};
  ${({ isTablet }) =>
    !isTablet &&
    css`
      min-width: ${CHAT_WINDOW_MIN_WIDTH};
    `};
`;

export default ActiveWindow;

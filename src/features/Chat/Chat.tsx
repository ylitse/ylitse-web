import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMobileMode } from '@/hooks/useMobileMode';

import { fetchContacts, fetchMessages } from './chatApi';
import { ChatContact, addChat, setActiveChat } from './chatSlice';

import ChatMenu from './ChatMenu';
import ChatWindow from './ChatWindow';
import {
  breakpoints,
  CONTENT_HEIGHT,
  CONTENT_WIDTH,
  OUTER_VERTICAL_MARGIN,
} from '@/components/variables';
import PageWithTransition from '@/components/PageWithTransition';
import Spinner from '@/components/Spinner';

const fetchChats = async (dispatch, setIsLoading) => {
  try {
    const contacts = await fetchContacts();
    const messages = await fetchMessages(contacts);

    const chats: ChatContact[] = contacts.map(contact => {
      const messageList = messages
        .filter(
          message =>
            message.recipient_id === contact.id ||
            message.sender_id === contact.id,
        )
        .map(m => {
          return {
            content: m.content,
            created: m.created,
            id: m.id,
            opened: m.opened,
            recipientId: m.recipent_id,
            senderId: m.sender_id,
          };
        });

      return {
        active: contact.active,
        category: 'active',
        displayName: contact.display_name,
        id: contact.id,
        messages: messageList,
        name: contact.name,
        role: contact.role,
        status: contact.status,
      };
    });

    chats.forEach(chat => dispatch(addChat(chat)));

    if (chats.length) {
      dispatch(setActiveChat(chats[0].id));
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const isMobile = useMobileMode();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchChats(dispatch, setIsLoading);
  }, [dispatch]);

  return (
    <PageWithTransition>
      <PageContainer isMobile={isMobile}>
        {isLoading ? (
          <Spinner variant="large" />
        ) : (
          <ChatContainer>
            <ChatMenu />
            <ChatWindow />
          </ChatContainer>
        )}
      </PageContainer>
    </PageWithTransition>
  );
};

const PageContainer = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    isMobile
      ? css`
          width: 100vw;
        `
      : css`
          display: flex;
          flex-direction: column;
          margin: ${OUTER_VERTICAL_MARGIN} auto;
          max-width: ${CONTENT_WIDTH};
          width: ${CONTENT_WIDTH};
        `}
  @media screen and (max-width: ${breakpoints.mobile}) {
    flex: 1;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  gap: 22px;
  height: ${CONTENT_HEIGHT};
  justify-content: center;
  min-height: 400px;
`;

export default ChatPage;

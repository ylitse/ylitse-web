import styled, { css } from 'styled-components';

import { useMobileMode } from '@/hooks/useMobileMode';

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
import { useEffect, useState } from 'react';
import { ChatContact, addChat, setActiveChat } from './chatSlice';
import { useDispatch } from 'react-redux';

const ChatPage = () => {
  const dispatch = useDispatch();
  const isMobile = useMobileMode();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch chats from API
  useEffect(() => {
    // This function calls the API to get a list of chats (contacts and messages)
    // It gets a list of contacts for the user, and then gets a list of messages between the user and each contact
    // It then combines the contact and message lists to create a list of chats
    const fetchChats = async () => {
      const maxMessagesAtOnce = 20;

      // TODO: A hook for getting the id of the logged-in user
      const response = await fetch('/api/myuser');
      if (response.ok) {
        const user = await response.json();
        const userId = user['user']['id'];

        // Fetch logged-in user's contacts
        const contactData = await fetch(` api/users/${userId}/contacts`);
        const contactsDataJson = await contactData.json();
        const contacts = contactsDataJson['resources'];
        const contactIds = contacts.map(c => c.id).join(',');

        // Fetch messages between logged-in user and each contact
        const messagesData = await fetch(
          `api/users/${userId}/messages?contact_user_ids=${contactIds}&max=${maxMessagesAtOnce}&desc=true`,
        );
        const messagesDataJson = await messagesData.json();
        const messages = messagesDataJson['resources'];

        const chats: ChatContact[] = contacts.map(contact => {
          const messageList = messages.filter(
            message =>
              message['recipient_id'] === contact.id ||
              message['sender_id'] === contact.id,
          );
          // All messages get the category 'active'
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
        chats.forEach((chat: ChatContact) => dispatch(addChat(chat)));
        // Set the active chat to the first chat in the list
        if (chats.length) {
          dispatch(setActiveChat(chats[0].id));
        }
        setIsLoading(false);
      }
    };
    fetchChats();
  }, []);

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

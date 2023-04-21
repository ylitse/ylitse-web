import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChatContact,
  addChat,
  getChatsByActiveCategory,
  setActiveCategory,
  setActiveChat,
} from './chatSlice';

import BackArrowIcon from '@/static/icons/back-arrow.svg';

import IconButton from '@/components/Buttons/IconButton';
import { palette } from '@/components/variables';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import Text from '@/components/Text';
import { RootState } from '@/store';

type ChatCategory = 'active' | 'archived' | 'blocked';

const ChatMenu = () => {
  const { t } = useTranslation('chat');
  const [showCategories, setShowCategories] = useState(false);

  const activeCategory = useSelector(
    (state: RootState) => state.chats.activeCategory,
  );

  const chats = useSelector(getChatsByActiveCategory);

  const activeChatId = useSelector(
    (state: RootState) => state.chats.activeChatId,
  );

  const dispatch = useDispatch();

  const changeActiveCategory = (category: ChatCategory) => {
    dispatch(setActiveCategory(category));
  };

  // Fetch chats from API
  useEffect(() => {
    // This function calls the API to get a list of chats (contacts and messages)
    // The function is called when the user first logs in, and whenever they would like to refresh their chat list
    // It gets a list of contacts for the user, and then gets a list of messages between the user and each contact
    // It then combines the contact and message lists to create a list of chats
    const fetchChats = async () => {
      const maxMessagesAtOnce = 20;

      const response = await fetch('/api/myuser');
      if (response.ok) {
        const user = await response.json();
        const userId = user['user']['id'];
        const contactData = await fetch(`api/users/${userId}/contacts`);
        const contactsDataJson = await contactData.json();
        const contacts = contactsDataJson['resources'];
        const contactIds = contacts.map(c => c.id).join(',');

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
          return {
            active: contact.active,
            category:
              contact.status === 'banned'
                ? 'blocked'
                : contact.status === 'archived'
                ? 'archived'
                : 'active',
            displayName: contact.display_name,
            id: contact.id,
            messages: messageList,
            name: contact.name,
            role: contact.role,
          };
        });
        chats.forEach((chat: ChatContact) => dispatch(addChat(chat)));
        // Set the active chat to the first chat in the list
        if (chats.length) {
          dispatch(setActiveChat(chats[0].id));
        }
      }
    };
    fetchChats();
  }, []);

  // The chooseChat function is called when the user clicks on a chat in the chat menu
  // It sets the active chat to the chat that was clicked on
  const chooseChat = (chatId: string) => {
    // Update the chat in the store to be opened
    dispatch(setActiveChat(chatId));
  };

  return (
    <Container>
      <Row>
        <Header variant="h1">{t(`menu.title.${activeCategory}`)}</Header>
        <Buttons>
          {!!chats.length && (
            <IconButton
              variant="searchWithBackground"
              sizeInPx={40}
              onClick={() => console.log('searching...')}
            />
          )}
          <IconButton
            variant="menuLines"
            sizeInPx={40}
            onClick={() => setShowCategories(!showCategories)}
          />
        </Buttons>
      </Row>

      {(showCategories ||
        activeCategory === 'archived' ||
        activeCategory === 'blocked') && (
        <Row
          clickable
          onClick={() => {
            changeActiveCategory('active');
            setShowCategories(false);
          }}
        >
          <GoBackLink>
            <GoBackIcon src={BackArrowIcon} />
            <Text variant="boldBaloo" color="purple">
              {t('menu.back')}
            </Text>
          </GoBackLink>
        </Row>
      )}

      {showCategories ? (
        <>
          <Row
            clickable
            onClick={() => {
              changeActiveCategory('archived');
              setShowCategories(false);
            }}
          >
            <CategoryLink>
              <Text variant="boldBaloo" color="purple">
                {t('menu.archived')}
              </Text>
            </CategoryLink>
          </Row>
          <Row
            clickable
            onClick={() => {
              changeActiveCategory('blocked');
              setShowCategories(false);
            }}
          >
            <CategoryLink>
              <Text variant="boldBaloo" color="purple">
                {t('menu.blocked')}
              </Text>
            </CategoryLink>
          </Row>
        </>
      ) : chats.length ? (
        <ChatList>
          {chats.map(chatContact => {
            const unreadMessages = chatContact.messages.filter(
              message => !message.opened,
            );
            return (
              <Row
                active={chatContact.id === activeChatId}
                clickable
                key={chatContact.id}
                onClick={() => chooseChat(chatContact.id)}
              >
                <ProfileIcon color="purpleDark" />
                <MentorInfo>
                  <BuddyName>
                    <Text variant="boldSource">{chatContact.displayName}</Text>
                    {!!unreadMessages.length && (
                      <Badge>{unreadMessages.length}</Badge>
                    )}
                  </BuddyName>
                  <Text variant="simpleSource">
                    {chatContact.messages[0]?.content}
                  </Text>
                </MentorInfo>
              </Row>
            );
          })}
        </ChatList>
      ) : (
        <CategoryEmptyText>
          {t(`menu.empty.${activeCategory}`)}
        </CategoryEmptyText>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  flex: 0 0 400px;
`;

const Row = styled.div<{ clickable?: boolean; active?: boolean }>`
  align-items: center;
  background-color: ${({ active }) => (active ? palette.blue2 : palette.white)};
  border-bottom: 1px solid ${palette.greyLight};
  box-sizing: border-box;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  display: flex;
  flex-direction: row;
  height: 80px;
  padding-left: 40px;
`;

const GoBackLink = styled.a`
  align-items: center;
  display: flex;
  padding-left: 40px;
  padding-right: 40px;
`;

const GoBackIcon = styled.img`
  padding-right: 20px;
`;

const CategoryLink = styled.a`
  padding-left: 40px;
`;

const Header = styled(Text)`
  flex: 1;
`;

const Buttons = styled.div`
  display: flex;
  gap: 25px;
  padding-right: 30px;
`;

const ChatList = styled.div``;

const MentorInfo = styled.div`
  color: ${palette.blueDark};
  margin-left: 20px;
  padding-bottom: 15px;
  padding-top: 15px;
`;

const BuddyName = styled.div`
  display: flex;
  flex-direction: row;
`;

const Badge = styled.div`
  align-items: center;
  background-color: ${palette.blue2};
  border-radius: 50%;
  color: ${palette.blueDark};
  display: flex;
  font-family: 'Source Sans Pro';
  font-size: '1rem',
  font-weight: 600;
  height: 27px;
  justify-content: center;
  margin-left: 10px;
  width: 27px;
`;

const CategoryEmptyText = styled(Text)`
  margin: 0;
  padding: 1.25rem 2rem;
`;

export default ChatMenu;

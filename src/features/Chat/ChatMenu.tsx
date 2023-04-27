import styled, { css } from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
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

export type ChatCategory = 'active' | 'archived' | 'blocked';

const ChatMenu = () => {
  const { t } = useTranslation('chat');
  const [showCategories, setShowCategories] = useState(false);

  const activeCategory: ChatCategory = useSelector(
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

  const getLatestMessage = (chatId: string) => {
    const chat = chats.find(chat => chat.id === chatId);
    if (chat) {
      const latestMessage = chat.messages[chat.messages.length - 1];
      if (latestMessage) {
        return latestMessage.content;
      }
    }
    return '';
  };

  // The chooseChat function is called when the user clicks on a chat in the chat menu
  // It sets the active chat to the chat that was clicked on
  const chooseChat = (chatId: string) => {
    // Update the chat in the store to be opened
    dispatch(setActiveChat(chatId));
  };

  return (
    <Container>
      <HeaderRow>
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
      </HeaderRow>

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
                category={activeCategory}
                clickable
                key={chatContact.id}
                onClick={() => chooseChat(chatContact.id)}
              >
                <ProfileIcon
                  color={
                    chatContact.id === activeChatId
                      ? 'blueDark'
                      : activeCategory === 'active'
                      ? 'purpleDark'
                      : activeCategory === 'archived'
                      ? 'orangeDark'
                      : 'redDark'
                  }
                />
                <MentorInfo>
                  <BuddyName>
                    <Text variant="boldSource">{chatContact.displayName}</Text>
                    {!!unreadMessages.length && (
                      <Badge>{unreadMessages.length}</Badge>
                    )}
                  </BuddyName>
                  <MessagePreview>
                    {getLatestMessage(chatContact.id)}
                  </MessagePreview>
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

const Row = styled.div<{
  clickable?: boolean;
  active?: boolean;
  category?: string;
}>`
  align-items: center;
  background-color: ${({ active, category }) =>
    active && category
      ? category === 'active'
        ? palette.blue2
        : category === 'archived'
        ? palette.orange
        : palette.redSalmon
      : palette.white}}
  border-bottom: 1px solid ${palette.greyLight};
  box-sizing: border-box;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  display: flex;
  flex-direction: row;
  height: 80px;
  padding-left: 40px;

  ${({ active, clickable, category }) =>
    !active &&
    clickable &&
    category &&
    css`
      &:hover {
        background-color: ${category === 'active'
          ? palette.blueWhite
          : category === 'archived'
          ? palette.orangeWhite
          : palette.redWhite};
      }
    `}
`;

const HeaderRow = styled(Row)`
  border-radius: 10px 10px 0 0;
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
  width: 240px;
`;

const BuddyName = styled.div`
  display: flex;
  flex-direction: row;
`;

const MessagePreview = styled(Text)`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

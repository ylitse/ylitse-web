import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import ArchivedIcon from '@/static/icons/archived-chats.svg';
import BlockedIcon from '@/static/icons/blocked-chats.svg';
import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import { Button, IconButton, TextButton } from '@/components/Buttons';
import Message from './Message';
import {
  addMessage,
  ChatMessage,
  getActiveChat,
  updateChat,
} from './chatSlice';
import { RootState } from '@/store';
import { Fragment } from 'react';
import { ChatCategory } from './ChatMenu';

const searchInputIconSize = 24;
const closeInputIconSize = 34;

const ChatWindow = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('chat');
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();
  const chat = useSelector(getActiveChat);
  const activeCategory: ChatCategory = useSelector(
    (state: RootState) => state.chats.activeCategory,
  );

  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    historyRef.current?.lastElementChild?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [chat]);

  // Archive Chat
  const archiveChat = () => {
    if (chat) {
      dispatch(
        updateChat({ chatData: { category: 'archived' }, chatId: chat.id }),
      );
    }
  };

  // Block chat
  const blockChat = () => {
    if (chat) {
      dispatch(
        updateChat({ chatData: { category: 'blocked' }, chatId: chat.id }),
      );
    }
  };

  // Restore chat
  const restoreChat = () => {
    if (chat) {
      dispatch(
        updateChat({ chatData: { category: 'active' }, chatId: chat.id }),
      );
    }
  };

  // Add new message to state and empty the input field
  const sendMessage = () => {
    if (chat && inputValue) {
      // Get current time as ISO 8601 string
      const now = new Date().toISOString();
      const chatId = chat.id || '';
      const message: ChatMessage = {
        content: inputValue,
        created: now,
        id: '1',
        opened: true,
        recipientId: chat.id,
        senderId: '2',
      };
      dispatch(addMessage({ chatId, message }));
      setInputValue('');
    }
  };

  interface GroupedMessages {
    date: string;
    messages: ChatMessage[];
  }

  // Group messages by date
  const groupedMessages: GroupedMessages[] = !chat
    ? []
    : chat.messages.reduce((acc: GroupedMessages[], curr: ChatMessage) => {
        const messageDate = new Date(curr.created).toLocaleDateString('fi-FI', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });
        const groupIndex = acc.findIndex(group => group.date === messageDate);

        if (groupIndex === -1) {
          acc.push({ date: messageDate, messages: [curr] });
        } else {
          acc[groupIndex].messages.push(curr);
        }

        return acc;
      }, []);

  return chat ? (
    <ActiveChatContainer>
      <HeaderBar>
        <ProfileInfo>
          {activeCategory === 'active' ? (
            <ProfileIcon color="purpleDark" />
          ) : (
            <img
              src={activeCategory === 'archived' ? ArchivedIcon : BlockedIcon}
            />
          )}
          <MentorName variant="h2">{chat?.displayName}</MentorName>
          <MentorBio variant="p">{chat?.status}</MentorBio>
        </ProfileInfo>
        {showSearch ? (
          <SearchBar>
            <SearchInput
              variant="iconInput"
              color={searchValue ? 'blueDark' : 'greyFaded'}
              leftIcon={{
                sizeInPx: searchInputIconSize,
                variant: 'search',
              }}
              rightButton={{
                onClick: () => setShowSearch(false),
                sizeInPx: closeInputIconSize,
                variant: 'closeWithBackground',
              }}
              onChange={setSearchValue}
              placeholder={t('header.search')}
              value={searchValue}
            />
          </SearchBar>
        ) : (
          <Buttons>
            <IconButton
              variant="search"
              sizeInPx={24}
              onClick={() => setShowSearch(true)}
            />
            {activeCategory === 'active' ? (
              <>
                <Button
                  onClick={archiveChat}
                  leftIcon="archive"
                  sizeInPx={24}
                  text={{
                    color: 'purple',
                    text: t('header.archive'),
                    variant: 'link',
                  }}
                />
                <Button
                  onClick={blockChat}
                  leftIcon="block"
                  sizeInPx={24}
                  text={{
                    color: 'purple',
                    text: t('header.block'),
                    variant: 'link',
                  }}
                />
              </>
            ) : (
              <Button
                onClick={restoreChat}
                leftIcon="return"
                sizeInPx={24}
                text={{
                  color: 'purple',
                  text: t('header.restore'),
                  variant: 'link',
                }}
              />
            )}
          </Buttons>
        )}
      </HeaderBar>
      <ChatHistory ref={historyRef}>
        {groupedMessages.map(group => (
          <Fragment key={group.date}>
            <DateDivider>{group.date}</DateDivider>
            {group.messages.map(message => (
              <Message
                key={message.id}
                category={chat.category}
                opened={message.opened}
                isSent={message.recipientId === chat?.id}
                message={message.content}
                sentTime={message.created}
              />
            ))}
          </Fragment>
        ))}
      </ChatHistory>
      <MessageField>
        <Input
          variant="textarea"
          color={inputValue ? 'blueDark' : 'greyFaded'}
          onChange={setInputValue}
          placeholder={t('input.placeholder')}
          value={inputValue}
        />
        <SendButton variant="send" sizeInPx={46} onClick={sendMessage} />
      </MessageField>
    </ActiveChatContainer>
  ) : (
    <div>
      <UpperWelcomeContainer>
        <WelcomeText isHeader variant="h2">
          {t('welcome.upper.title')}
        </WelcomeText>
        <WelcomeText>{t('welcome.upper.description')}</WelcomeText>
      </UpperWelcomeContainer>
      <LowerWelcomeContainer>
        <WelcomeText isHeader variant="h2">
          {t('welcome.lower.title')}
        </WelcomeText>
        <WelcomeText>{t('welcome.lower.description')}</WelcomeText>
        <SearchButton onClick={() => navigate('/mentors')}>
          {t('welcome.lower.button')}
        </SearchButton>
      </LowerWelcomeContainer>
    </div>
  );
};

const ActiveChatContainer = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
`;

const HeaderBar = styled.div`
  border-bottom: 1px solid ${palette.greyLight};
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  height: 80px;
  justify-content: space-between;
  min-width: 800px;
  padding: 14px 40px;
`;

const ProfileInfo = styled.div`
  align-items: center;
  display: flex;
`;

const MentorName = styled(Text)`
  display: block;
  padding-left: 20px;
  padding-right: 30px;
  white-space: nowrap;
`;

const MentorBio = styled(Text)`
  display: block;
  white-space: nowrap;
`;

const SearchBar = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-left: -${searchInputIconSize}px;
  margin-right: -${closeInputIconSize}px;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  max-width: 400px;
  &:focus {
    outline: 1px solid ${palette.purple};
  }
`;

const Buttons = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
`;

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

const MessageField = styled.div`
  align-items: center;
  display: flex;
`;

const Input = styled(TextInput)`
  box-sizing: border-box;
  flex: 1;
  height: 80px;
  margin: 20px 1.25rem 20px 40px;

  &:focus {
    outline: 1px solid ${palette.purple};
  }
`;

const SendButton = styled(IconButton)`
  margin-right: 1.25rem;
`;

const UpperWelcomeContainer = styled.div`
  background-color: ${palette.white};
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  height: 50%;
  justify-content: center;
`;

const LowerWelcomeContainer = styled.div`
  background-color: ${palette.blue2};
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  height: 50%;
  justify-content: center;
`;

const WelcomeText = styled(Text)<{ isHeader?: boolean }>`
  margin: 0;
  ${({ isHeader }) =>
    isHeader &&
    css`
      padding-bottom: 1rem;
    `}
  padding-left: 10%;
  padding-right: 10%;
`;

const SearchButton = styled(TextButton)`
  align-self: center;
  border-radius: 50px;
  font-size: 22px;
  height: 48px;
  margin-top: 2rem;
  width: 272px;
`;

export default ChatWindow;

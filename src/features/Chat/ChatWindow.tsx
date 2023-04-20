import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import { Button, IconButton, TextButton } from '@/components/Buttons';
import Message from './Message';

const searchInputIconSize = 24;
const closeInputIconSize = 34;

export type MessageType = {
  buddyId: string;
  content: string;
  isSeen: boolean;
  messageId: string;
  sentTime: number; // Unix timestamp
  type: 'Sent' | 'Received';
};

const ChatWindow = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('chat');
  const chats = [{}];
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [chatHistory, setChatHistory] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchChatHistory = async () => {
      // const response = await fetch('/api/chat');
      // const data = await response.json();
    };
    fetchChatHistory();
  }, []);

  // Adds the input value to the chat history with the current time as sentTime and messageId is a random number
  const sendMessage = () => {
    if (inputValue) {
      setChatHistory([
        ...chatHistory,
        {
          buddyId: '1',
          content: inputValue,
          isSeen: true,
          messageId: Math.random().toString(),
          sentTime: Math.floor(Date.now() / 1000),
          type: 'Sent',
        },
      ]);
      setInputValue('');
    }
  };

  return chats.length ? (
    <ActiveChatContainer>
      <HeaderBar>
        <ProfileInfo>
          <ProfileIcon color="purpleDark" />
          <MentorName variant="h2">{'Essi Esimerkki'}</MentorName>
          <MentorBio variant="p">{'Kuvaus'}</MentorBio>
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
            <Button
              onClick={() => console.log('archiving')}
              leftIcon="archive"
              sizeInPx={24}
              text={{
                color: 'purple',
                text: t('header.archive'),
                variant: 'link',
              }}
            />
            <Button
              onClick={() => console.log('blocking')}
              leftIcon="block"
              sizeInPx={24}
              text={{
                color: 'purple',
                text: t('header.block'),
                variant: 'link',
              }}
            />
          </Buttons>
        )}
      </HeaderBar>
      <ChatHistory>
        {chatHistory.map((message: MessageType) => (
          <Message
            key={message.messageId}
            isSeen={message.isSeen}
            isSent={message.type === 'Sent'}
            message={message.content}
            sentTime={message.sentTime}
          />
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
  padding: 0px 40px;
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

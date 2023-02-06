import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import { Button, IconButton, TextButton } from '@/components/Buttons';
import { useState } from 'react';

const ChatWindow = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('chat');
  const chats = [{}];
  const [inputValue, setInputValue] = useState('');

  return chats.length ? (
    <ActiveChatContainer>
      <HeaderBar>
        <LeftBar>
          <ProfileIcon color="purpleDark" />
          <MentorName variant="h2">Eveliina_96</MentorName>
          <Text variant="p">Jutellaanko? </Text>
        </LeftBar>
        <RightBar>
          <IconButton
            variant="search"
            sizeInPx={20}
            onClick={() => console.log('searching...')}
          />
          <Button
            onClick={() => console.log('archiving')}
            leftIcon="archive"
            sizeInPx={20}
            text={{
              color: 'purple',
              text: 'Arkistoi',
              variant: 'link',
            }}
          />
          <Button
            onClick={() => console.log('blocking')}
            leftIcon="block"
            sizeInPx={20}
            text={{
              color: 'purple',
              text: 'Estä käyttäjä',
              variant: 'link',
            }}
          />
        </RightBar>
      </HeaderBar>
      <ChatHistory></ChatHistory>
      <MessageField>
        <Input
          variant="textarea"
          color={inputValue ? 'blueDark' : 'greyFaded'}
          onChange={setInputValue}
          placeholder="Kirjoita viestisi tähän"
          value={inputValue}
        />
        <SendButton
          variant="send"
          sizeInPx={46}
          onClick={() => console.log('sending...')}
        />
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
  display: flex;
  gap: 30px;
  height: 80px;
  justify-content: space-between;
  padding: 0 40px;
`;

const LeftBar = styled.div`
  align-items: center;
  display: flex;
`;

const MentorName = styled(Text)`
  padding-left: 20px;
  padding-right: 30px;
`;

const RightBar = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
`;

const ChatHistory = styled.div`
  border-bottom: 1px solid ${palette.greyLight};
  flex: 1;
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

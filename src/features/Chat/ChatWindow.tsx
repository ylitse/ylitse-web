import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import Text from '@/components/Text';
import { Button, IconButton, TextButton } from '@/components/Buttons';

const ChatWindow = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('chat');
  const chats = [{}];

  return chats.length ? (
    <ActiveChatContainer>
      <HeaderBar>
        <LeftBar>
          <ProfileIcon color="purpleDark" />
          <Text variant="h2">Eveliina_96</Text>
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
              variant: 'bold',
            }}
          />
        </RightBar>
      </HeaderBar>
      <ChatHistory></ChatHistory>
      <MessageField>
        <TextInput placeholder="Kirjoita viestisi tähän" />
        <IconButton
          variant="send"
          sizeInPx={46}
          onClick={() => console.log('sending...')}
        />
      </MessageField>
    </ActiveChatContainer>
  ) : (
    <Container>
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
    </Container>
  );
};

const ActiveChatContainer = styled.div`
  background-color: ${palette.white};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 780px;
  width: 1021px;
`;

const HeaderBar = styled.div`
  border-bottom: 1px solid ${palette.greyLight};
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
`;

const LeftBar = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
`;

const RightBar = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
`;

const ChatHistory = styled.div`
  border-bottom: 1px solid ${palette.greyLight};
  height: 580px;
`;

const MessageField = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
  height: 120px;
  padding-left: 40px;
  padding-right: 20px;
`;

const TextInput = styled.input`
  border: 1px solid ${palette.purple};
  border-radius: 10px;
  color: ${palette.greyFaded};
  display: flex;
  font-family: 'Source Sans Pro';
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  height: 80px;
  line-height: 1.5rem;
  width: 883px;
`;

const Container = styled.div`
  height: 780px;
  width: 1021px;
`;

const UpperWelcomeContainer = styled.div`
  background-color: ${palette.white};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 50%;
  justify-content: center;
`;

const LowerWelcomeContainer = styled.div`
  background-color: ${palette.blue2};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
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

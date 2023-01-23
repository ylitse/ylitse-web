import styled from 'styled-components';
import { basicSourceSansText, palette } from '@/components/variables';
import { useState } from 'react';
import { TextButton } from '@/components/Buttons';
import { useTranslation } from 'react-i18next';

const ChatWindow = () => {
  const { t } = useTranslation();
  const [chats, setChats] = useState([]);

  return chats.length ? (
    <ActiveChatContainer></ActiveChatContainer>
  ) : (
    <Container>
      <UpperWelcomeContainer>
        <Header>{t('chatPage.chat.welcome.upper.title')}</Header>
        <Text>{t('chatPage.chat.welcome.upper.description')}</Text>
      </UpperWelcomeContainer>
      <LowerWelcomeContainer>
        <Header>{t('chatPage.chat.welcome.lower.title')}</Header>
        <Text>{t('chatPage.chat.welcome.lower.description')}</Text>
        <SearchButton>{t('chatPage.chat.welcome.lower.button')}</SearchButton>
      </LowerWelcomeContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 1021px;
  height: 780px;
`;

const ActiveChatContainer = styled.div``;

const UpperWelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  background-color: ${palette.white};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const LowerWelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  background-color: ${palette.blue2};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
`;

const Header = styled.h2`
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 1rem;
  margin: 0;
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 42px;
  color: ${palette.darkblue};
`;

const Text = styled.p`
  ${basicSourceSansText}
  padding-left: 10%;
  padding-right: 10%;
  margin: 0;
  line-height: 30px;
  color: ${palette.darkblue};
`;

const SearchButton = styled(TextButton)`
  margin-top: 2rem;
  width: 272px;
  height: 48px;
  font-size: 22px;
  border-radius: 50px;
  align-self: center;
`;

export default ChatWindow;

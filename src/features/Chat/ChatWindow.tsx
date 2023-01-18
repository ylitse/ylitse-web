import styled from 'styled-components';
import { palette } from '@/components/variables';
import { useState } from 'react';
import { TextButton } from '@/components/Buttons';
import { useTranslation } from 'react-i18next';

const ChatWindow = () => {
  const { t } = useTranslation();
  const [chats, setChats] = useState([]);

  return (
    <Container>
      {chats.length ? (
        <ActiveChatContainer></ActiveChatContainer>
      ) : (
        <>
          <UpperWelcomeContainer>
            <Header>{t('chatPage.chat.welcome.upper.title')}</Header>
            <Text>{t('chatPage.chat.welcome.upper.description')}</Text>
          </UpperWelcomeContainer>
          <LowerWelcomeContainer>
            <Header>{t('chatPage.chat.welcome.lower.title')}</Header>
            <Text>{t('chatPage.chat.welcome.lower.description')}</Text>
            <SearchButton>
              {t('chatPage.chat.welcome.lower.button')}
            </SearchButton>
          </LowerWelcomeContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display-flex;
  flex-direction: column;
  background-color: ${palette.white};
  border-radius: 10px;
  width: 1021px;
`;

const ActiveChatContainer = styled.div``;

const UpperWelcomeContainer = styled.div`
  height: 192px;
  padding-top: 123px;
  padding-left: 96px;
  padding-right: 116px;
  padding-bottom: 84px;
`;

const LowerWelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 232px;
  background-color: ${palette.blue2};
  padding-top: 80px;
  padding-left: 96px;
  padding-right: 116px;
  padding-bottom: 69px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
`;

const Header = styled.h2`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 42px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: none;
  padding: none;
  color: ${palette.darkblue};
`;

const Text = styled.p`
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  display: flex;
  align-items: center;
  margin: none;
  padding: none;
  color: ${palette.darkblue};
`;

const SearchButton = styled(TextButton)`
  height: 48px;
  width: 272px;
  border-radius: 50px;
  font-family: Baloo 2;
  font-size: 22px;
  font-weight: 700;
  line-height: 35px;
  letter-spacing: 0em;
  margin-top: 40px;
  text-align: center;
  align-self: center;
`;

export default ChatWindow;

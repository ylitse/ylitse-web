import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { palette } from '@/components/variables';
import { useState } from 'react';
import { TextButton } from '@/components/Buttons';
import { useTranslation } from 'react-i18next';
import Text from '@/components/Text';

const ChatWindow = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('chat');
  const [chats, setChats] = useState([]);

  return chats.length ? (
    <ActiveChatContainer></ActiveChatContainer>
  ) : (
    <Container>
      <UpperWelcomeContainer>
        <Header variant="h2">{t('welcome.upper.title')}</Header>
        <Description variant="p">{t('welcome.upper.description')}</Description>
      </UpperWelcomeContainer>
      <LowerWelcomeContainer>
        <Header variant="h2">{t('welcome.lower.title')}</Header>
        <Description variant="p">{t('welcome.lower.description')}</Description>
        <SearchButton onClick={() => navigate('/mentors')}>
          {t('welcome.lower.button')}
        </SearchButton>
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

const Header = styled(Text)`
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 1rem;
  margin: 0;
  color: ${palette.darkblue};
`;

const Description = styled(Text)`
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

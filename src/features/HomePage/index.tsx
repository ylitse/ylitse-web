import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { selectChats } from '@/features/Chat/chatSlice';
import { useAppSelector } from '@/store';

import { palette } from '@/components/variables';
import NewMessagesImage from '@/static/img/new-messages.svg';
import { TextButton } from '@/components/Buttons';
import Text from '@/components/Text';

import type { AppMessage } from '../Chat/chatPageApi';
import PageWithTransition from '@/components/PageWithTransition';

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('home');

  const unreadMessages: AppMessage[] = useAppSelector(selectChats)
    .map(chat => chat.messages)
    .flat()
    .filter(message => !message.opened);

  const unreadMessagesFound = unreadMessages.length >= 0;

  const navigateToChat = () => navigate('/chat');

  return (
    <PageWithTransition>
      <Container>
        {unreadMessagesFound && (
          <NewMessagesNotification>
            <TextContainer>
              <Title variant="h2" color="white">
                {t('newMessages.title')}
              </Title>
              <Text color="white">{t('newMessages.text')}</Text>
              <Button variant="outline" onClick={navigateToChat}>
                {t('newMessages.button')}
              </Button>
            </TextContainer>
            <Image src={NewMessagesImage} />
          </NewMessagesNotification>
        )}
      </Container>
    </PageWithTransition>
  );
};

const Container = styled.div`
  align-items: center;
  background-color: ${palette.blueLight};
  display: flex;
`;

const NewMessagesNotification = styled.div`
  align-items: center;
  background-color: ${palette.purple};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  height: 300px;
  margin-left: 6rem;
  margin-top: 4rem;
  padding: 2rem;
  position: relative;
`;

const TextContainer = styled.div`
  align-items: center;
  color: ${palette.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 70%;
`;

const Title = styled(Text)`
  color: ${palette.white};
  margin: 0;
`;

const Button = styled(TextButton)`
  margin-top: 1rem;
`;

const Image = styled.img`
  bottom: 0;
  position: absolute;
  right: -4rem;
`;

export default HomePage;

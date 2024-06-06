import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Mentor,
  selectFilteredMentors,
  useGetMentorsQuery,
} from '../MentorPage/mentorPageApi';
import { selectHasUnreadMessages } from '@/features/Chat/chatSlice';
import { useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import Background from '@/static/img/mountain-background.svg';
import ListCard from '../MentorPage/components/MentorList/MentorCard/List';
import MentorCard from '../MentorPage/components/MentorList/MentorCard/Expanded';
import NewMessagesImage from '@/static/img/new-messages.svg';
import PageWithTransition from '@/components/PageWithTransition';
import { palette } from '@/components/variables';
import Spinner from '@/components/Spinner';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';
import { UserRole, selectUserRole } from '../Authentication/userSlice';

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('home');

  const unreadMessagesFound: boolean = useAppSelector(selectHasUnreadMessages);
  const navigateToAdminPanel = () => navigate('/admin');
  const navigateToChat = () => navigate('/chat');
  const navigateToMentors = () => navigate('/mentors');

  const userRole: UserRole | null = useAppSelector(selectUserRole);

  const { isMobile } = useGetLayoutMode();
  console.log('isMobile is ' + isMobile);
  const { isLoading } = useGetMentorsQuery();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const mentorsToShow: Mentor[] = useAppSelector(selectFilteredMentors()).slice(
    0,
    2,
  );

  return (
    <PageWithTransition>
      <Container>
        <TopContainer>
          <InfoContainer>
            <Text variant="h1">{t('info.title')}</Text>
            <Text>{t('info.description1')}</Text>
            <List>
              <Text>{t('info.description2')}</Text>
              <Text>{t('info.description3')}</Text>
              <Text>{t('info.description4')}</Text>
              <Text variant="boldSource">{t('info.description5')}</Text>
            </List>
          </InfoContainer>
        </TopContainer>
        <MiddleContainer>
          <LeftMiddleContainer>
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
            <WelcomeNotice>
              {userRole === 'admin' && (
                <TextContainer>
                  <Title variant="h2" color="white">
                    {t('welcome.admin.title')}
                  </Title>
                  <Text color="white">{t('welcome.admin.text')}</Text>
                  <Button variant="outline" onClick={navigateToAdminPanel}>
                    {t('welcome.admin.button')}
                  </Button>
                </TextContainer>
              )}

              {userRole === 'mentor' && (
                <TextContainer>
                  <Title variant="h2" color="white">
                    {t('welcome.mentor.title')}
                  </Title>
                  <Text color="white">{t('welcome.mentor.text')}</Text>
                  <Button variant="outline" onClick={navigateToChat}>
                    {t('welcome.mentor.button')}
                  </Button>
                </TextContainer>
              )}

              {userRole === 'mentee' && (
                <TextContainer>
                  <Title variant="h2" color="white">
                    {t('welcome.mentee.title')}
                  </Title>
                  <Text color="white">{t('welcome.mentee.text')}</Text>
                  <Button variant="outline" onClick={navigateToMentors}>
                    {t('welcome.mentee.button')}
                  </Button>
                </TextContainer>
              )}
            </WelcomeNotice>

            <Notices>
              <Title variant="h2">{t('notices.title')}</Title>
              {/* Nämä haetaan bäkkäriltä */}
              <Notice variant="p">
                Palvelussa on käyttökatko 24.4.2022 klo 13 - 14. Pahoittelemme
                häiriötä.
              </Notice>
            </Notices>
          </LeftMiddleContainer>
          <RightMiddleContainer>
            <Concepts>
              <Title variant="h2">{t('concepts.title')}</Title>
              <Text variant="p">{t('concepts.description')} </Text>
              <Concept>
                <Text variant="boldSource">{t('concepts.concept1.name')}</Text>
                <Text variant="p">{t('concepts.concept1.definition')}</Text>
              </Concept>
              <Concept>
                <Text variant="boldSource">{t('concepts.concept2.name')}</Text>
                <Text variant="p">{t('concepts.concept2.definition')}</Text>
              </Concept>
              <Concept>
                <Text variant="boldSource">{t('concepts.concept3.name')}</Text>
                <Text variant="p">{t('concepts.concept3.definition')}</Text>
              </Concept>
            </Concepts>
          </RightMiddleContainer>
        </MiddleContainer>
        <BottomContainer>
          <BottomLeftContainer>
            <BottomTitle variant="h2">{t('newestMentors.title')}</BottomTitle>
            {isLoading ? (
              <Spinner variant="large" />
            ) : (
              <MentorCardContainer>
                {selectedMentor && (
                  <MentorCard
                    mentor={selectedMentor}
                    onDismiss={() => setSelectedMentor(null)}
                  />
                )}
                {mentorsToShow.map(mentor => (
                  <ListCard
                    key={mentor.buddyId}
                    mentor={mentor}
                    setVisibleCard={() => setSelectedMentor(mentor)}
                  />
                ))}
              </MentorCardContainer>
            )}
          </BottomLeftContainer>
          <BottomRightContainer>
            <FindMentorContainer>
              <TextContainer>
                <Title variant="h2" color="white">
                  {t('newestMentors.info.title')}
                </Title>
                <Text color="white">{t('newestMentors.info.text')}</Text>
                <Button variant="outline" onClick={navigateToMentors}>
                  {t('newestMentors.info.button')}
                </Button>
              </TextContainer>
            </FindMentorContainer>
          </BottomRightContainer>
        </BottomContainer>
      </Container>
    </PageWithTransition>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  align-items: center;
  background: url(${Background});
  background-position: left;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  height: 100%;
  justify-content: center;
  min-height: 50vh;
`;

const InfoContainer = styled.div`
  background-color: ${palette.blue2};
  border-bottom-right-radius: 275px;
  left: 4rem;
  max-width: 450px;
  padding: 2rem;
  position: absolute;
  top: 2rem;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const MiddleContainer = styled.div`
  background-color: ${palette.blueLight};
  display: flex;
  gap: 2rem;
  padding: 4rem;
`;

const LeftMiddleContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const NewMessagesNotification = styled.div`
  align-items: center;
  background-color: ${palette.purple};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  height: 300px;
  margin-bottom: 2rem;
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

const WelcomeNotice = styled.div`
  align-items: center;
  background-color: ${palette.purple};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Notices = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 2rem;
`;

const Notice = styled(Text)`
  background-color: ${palette.blueWhite};
  margin-top 1rem;
  padding: 1rem;
`;

const RightMiddleContainer = styled.div`
  flex: 1;
`;

const Concepts = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 2rem;
`;

const Concept = styled.div`
  background-color: ${palette.blueWhite};
  margin-bottom: 1rem;
  padding: 1rem;
`;

const BottomContainer = styled.div`
  align-items: center;
  background-color: ${palette.blueWhite};
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 4rem;
`;

const BottomLeftContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const BottomTitle = styled(Text)`
  color: ${palette.white};
`;

const MentorCardContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BottomRightContainer = styled.div`
  display: flex;
  width: 600px;
`;

const FindMentorContainer = styled.div`
  align-items: center;
  background-color: ${palette.purple};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 500px;
  justify-content: center;
  padding: 2rem;
`;

export default HomePage;

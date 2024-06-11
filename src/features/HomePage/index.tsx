import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { fetchNotices } from './noticesApi';
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
import {
  NAVIGATION_HEIGHT,
  OUTER_HORIZONTAL_MARGIN,
  palette,
} from '@/components/variables';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';
import { UserRole, selectUserRole } from '../Authentication/userSlice';

import type { Notice } from './noticesApi';

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('home');

  const unreadMessagesFound: boolean = useAppSelector(selectHasUnreadMessages);
  const navigateToAdminPanel = () => navigate('/admin');
  const navigateToChat = () => navigate('/chat');
  const navigateToMentors = () => navigate('/mentors');

  const userRole: UserRole | null = useAppSelector(selectUserRole);

  // TODO: Mobile view
  const { isMobile } = useGetLayoutMode();
  console.log('isMobile is ' + isMobile);
  const { isLoading } = useGetMentorsQuery();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const mentorsToShow: Mentor[] = useAppSelector(selectFilteredMentors()).slice(
    0,
    2,
  );
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const notices: Notice[] = fetchNotices();
    setNotices(notices);
  }, [notices]);

  return (
    <PageWithTransition>
      <TopContainer>
        <InfoContainer>
          <Text variant="h1">{t('info.title')}</Text>
          <Text>{t('info.description1')}</Text>
          <Text>{t('info.description2')}</Text>
          <Text>{t('info.description3')}</Text>
          <Text>{t('info.description4')}</Text>
          <Text variant="bold">{t('info.description5')}</Text>
        </InfoContainer>
      </TopContainer>
      <MiddleContainer>
        <LeftMiddleContainer>
          {!unreadMessagesFound && (
            <NewMessagesNotification>
              <TextContainer>
                <Text variant="h2" color="white">
                  {t('newMessages.title')}
                </Text>
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
                <Text variant="h2" color="white">
                  {t('welcome.admin.title')}
                </Text>
                <Text color="white">{t('welcome.admin.text')}</Text>
                <Button variant="outline" onClick={navigateToAdminPanel}>
                  {t('welcome.admin.button')}
                </Button>
              </TextContainer>
            )}

            {userRole === 'mentor' && (
              <TextContainer>
                <Text variant="h2" color="white">
                  {t('welcome.mentor.title')}
                </Text>
                <Text color="white">{t('welcome.mentor.text')}</Text>
                <Button variant="outline" onClick={navigateToChat}>
                  {t('welcome.mentor.button')}
                </Button>
              </TextContainer>
            )}

            {userRole === 'mentee' && (
              <TextContainer>
                <Text variant="h2" color="white">
                  {t('welcome.mentee.title')}
                </Text>
                <Text color="white">{t('welcome.mentee.text')}</Text>
                <Button variant="outline" onClick={navigateToMentors}>
                  {t('welcome.mentee.button')}
                </Button>
              </TextContainer>
            )}
          </WelcomeNotice>

          <Notices>
            <Text variant="h2">{t('notices.title')}</Text>
            {notices.map(notice => (
              <Notice key={notice.id}>{notice.message}</Notice>
            ))}
          </Notices>
        </LeftMiddleContainer>
        <RightMiddleContainer>
          <ConceptContainer>
            <Text variant="h2">{t('concepts.title')}</Text>
            <Text>{t('concepts.description')} </Text>
            <Concepts>
              <Concept>
                <Name variant="bold">{t('concepts.concept1.name')}</Name>
                <Equals>{t('concepts.equals')}</Equals>
                <Definition>{t('concepts.concept1.definition')}</Definition>
              </Concept>
              <Concept>
                <Name variant="bold">{t('concepts.concept2.name')}</Name>
                <Equals>{t('concepts.equals')}</Equals>
                <Definition>{t('concepts.concept2.definition')}</Definition>
              </Concept>
              <Concept>
                <Name variant="bold">{t('concepts.concept3.name')}</Name>
                <Equals>{t('concepts.equals')}</Equals>
                <Definition>{t('concepts.concept3.definition')}</Definition>
              </Concept>
            </Concepts>
          </ConceptContainer>
        </RightMiddleContainer>
      </MiddleContainer>
      <BottomContainer>
        <BottomTitle variant="h2">{t('newestMentors.title')}</BottomTitle>
        <MentorContainer>
          {!isLoading && (
            <MentorCards>
              {selectedMentor && (
                <MentorCard
                  mentor={selectedMentor}
                  onDismiss={() => setSelectedMentor(null)}
                />
              )}
              {mentorsToShow.map(mentor => (
                <ListCard
                  key={mentor.buddyId}
                  isHomePage
                  mentor={mentor}
                  setVisibleCard={() => setSelectedMentor(mentor)}
                />
              ))}
            </MentorCards>
          )}
          <FindMentorContainer>
            <TextContainer>
              <Text variant="h2" color="white">
                {t('newestMentors.info.title')}
              </Text>
              <Text color="white">{t('newestMentors.info.text')}</Text>
              <Button variant="outline" onClick={navigateToMentors}>
                {t('newestMentors.info.button')}
              </Button>
            </TextContainer>
          </FindMentorContainer>
        </MentorContainer>
      </BottomContainer>
    </PageWithTransition>
  );
};

const TopContainer = styled.div`
  background: url(${Background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 40rem;
  position: relative;
`;

const InfoContainer = styled.div`
  background-color: ${palette.blue2};
  border-bottom-right-radius: 275px;
  height: calc(40rem - ${NAVIGATION_HEIGHT} - 2rem);
  left: calc(${OUTER_HORIZONTAL_MARGIN} - 2vw);
  max-width: 25vw;
  padding: 2rem;
  position: absolute;
  top: 2rem;
`;

const MiddleContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 4rem ${OUTER_HORIZONTAL_MARGIN};
`;

const LeftMiddleContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2rem;
`;

const NewMessagesNotification = styled.div`
  align-items: center;
  background-color: ${palette.purple};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  height: 16rem;
  padding: 4rem 16rem 4rem 4rem;
  position: relative;
`;

const TextContainer = styled.div`
  align-items: center;
  color: ${palette.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
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
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 16rem;
  justify-content: center;
  padding: 4rem;
`;

const Notices = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 2rem;
`;

const Notice = styled(Text)`
  background-color: ${palette.blueWhite};
  border-left: 10px white solid;
  box-shadow: -10px 0 0 0 ${palette.blue};
  left: 10px;
  margin-top: 1rem;
  padding: 1rem;
  position: relative;
`;

const RightMiddleContainer = styled.div`
  flex: 1;
`;

const ConceptContainer = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Concepts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Concept = styled.div`
  background-color: ${palette.blueWhite};
  display: flex;
  padding: 1rem;
`;

const Name = styled(Text)`
  white-space: nowrap;
`;

const Equals = styled(Text)`
  margin: 0 0.5rem;
`;

const Definition = styled(Text)`
  margin: 0;
`;

const BottomContainer = styled.div`
  background-color: ${palette.blueWhite};
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 4rem ${OUTER_HORIZONTAL_MARGIN};
`;

const BottomTitle = styled(Text)`
  color: ${palette.white};
`;

const MentorContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
`;

const MentorCards = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FindMentorContainer = styled.div`
  align-items: center;
  background-color: ${palette.purple};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
  min-height: 26rem;
  padding: 4rem;
`;

export default HomePage;

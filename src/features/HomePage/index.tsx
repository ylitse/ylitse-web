import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Mentor, selectFilteredMentors } from '../MentorPage/mentorPageApi';
import { selectHasUnreadMessages } from '@/features/Chat/chatSlice';
import { useAppSelector } from '@/store';

import Background from '@/static/img/mountain-background.svg';
import MentorList from '../MentorPage/components/MentorList';
import NewMessagesImage from '@/static/img/new-messages.svg';
import PageWithTransition from '@/components/PageWithTransition';
import { palette } from '@/components/variables';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('home');

  const unreadMessagesFound: boolean = useAppSelector(selectHasUnreadMessages);
  const navigateToChat = () => navigate('/chat');

  // const { isMobile } = useGetLayoutMode();
  // const { isLoading } = useGetMentorsQuery();
  const mentorsToShow: Mentor[] = useAppSelector(selectFilteredMentors()).slice(
    0,
    2,
  );

  return (
    <PageWithTransition>
      <Container>
        <TopContainer>
          <InfoContainer>
            <Text variant="h1">Ylitse MentorApp</Text>
            <Text variant="p">
              Ylitse MentorApp -vertaismentoripalvelussa mentorit auttavat sinua
              henkilökohtaisessa tilanteessasi luottamuksellisesti. Voit valita
              sopivan mentorin ongelmasi perusteella ja saada apua ajasta ja
              paikasta riippumatta.
            </Text>
            <List>
              <Text variant="p">
                - Voit käyttää sovellusta nimettömästi ja luottamuksellisesti.
              </Text>
              <Text variant="p">- Palvelun käyttö on sinulle maksutonta.</Text>
              <Text variant="p">
                - Kohtaat ihmisiä, jotka ovat olleet samassa tilanteessa.
              </Text>
              <Text variant="boldSource">He tietävät, mistä puhut.</Text>
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
              {/* Eri tekstit jos mentori tai admin */}
              <TextContainer>
                <Title variant="h2" color="white">
                  Aloita etsimällä mentori
                </Title>
                <Text color="white">
                  Selaa mentoreiden profiileja tai hae tietyn hakusanan mukaan.
                  Kun sopiva mentori löytyy, voit aloittaa keskustelun hänen
                  kanssaan.
                </Text>
                <Button variant="outline" onClick={navigateToChat}>
                  Etsi mentori
                </Button>
              </TextContainer>
            </WelcomeNotice>
            <Notices>
              <Title variant="h2">Tiedotteet</Title>
              <Notice variant="p">
                Palvelussa on käyttökatko 24.4.2022 klo 13 - 14. Pahoittelemme
                häiriötä.
              </Notice>
            </Notices>
          </LeftMiddleContainer>
          <RightMiddleContainer>
            <Concepts>
              <Title variant="h2">Käsitteet</Title>
              <Text variant="p">
                Tässä muutamia käsitteitä, joiden avulla palvelun käyttö on
                helpompaa.
              </Text>
              <Concept>
                <Text variant="boldSource">Tilaviesti =</Text>
                <Text variant="p">
                  Jos mentori ei ole tavoitettavissa esimerkiksi loman takia,
                  hän voi ilmoittaa siitä tilaviestillä. Tilaviesti näkyy
                  mentorin profiilissa sekä keskustelussa mentorin kanssa.
                </Text>
              </Concept>
              <Concept>
                <Text variant="boldSource">Käsite 2 =</Text>
                <Text variant="p">
                  Lorem ipsum dolor sit amet. Vestibulum eu vulputate ipsum.
                  Proin eget dapibus risus.
                </Text>
              </Concept>
              <Concept>
                <Text variant="boldSource">Käsite 3 =</Text>
                <Text variant="p">
                  Ellentesque scelerisque diam eget metus sollicitudin,
                  tristique interdum lacus tristique.
                </Text>
              </Concept>
            </Concepts>
          </RightMiddleContainer>
        </MiddleContainer>
        <BottomContainer>
          <BottomTitle variant="h2">Uusimmat mentorit</BottomTitle>
          <MentorList
            setVisibleCard={mentor => console.log(mentor)}
            mentors={mentorsToShow}
          />
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
  width: 100%;
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
  flex-direction: column;
  min-height: 50vh;
  width: 100%;
`;

const BottomTitle = styled(Text)`
  color: ${palette.white};
`;

export default HomePage;

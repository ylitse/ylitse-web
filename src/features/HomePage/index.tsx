import styled from 'styled-components';

import { selectHasUnreadMessages } from '@/features/Chat/selectors';
import { useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import type { UserRole } from '@/features/Authentication/authenticationApi';

import Announcements from './components/Announcements';
import Background from '@/static/img/mountain-background.svg';
import Concepts from './components/Concepts';
import FindMentor from './components/FindMentor';
import Info from './components/Info';
import NewestMentors from './components/NewestMentors';
import NewMessages from './components/NewMessages';

import { OUTER_HORIZONTAL_MARGIN } from '@/components/constants';

import ProfileWidget from './components/ProfileWidget';

import PageWithTransition from '@/components/PageWithTransition';
import Welcome from './components/Welcome';

type Props = {
  userRole: UserRole;
};

const HomePage = ({ userRole }: Props) => {
  const hasUnreadMessages = useAppSelector(selectHasUnreadMessages);
  const { isTablet } = useGetLayoutMode();
  const isMentor = userRole === 'mentor';

  return isTablet ? (
    <PageWithTransition>
      <Info isMobile />
      {hasUnreadMessages ? <NewMessages isMobile /> : <Welcome isMobile />}
      <Announcements isMobile />
      <NewestMentors isMobile />
      <FindMentor isMobile />
      <Concepts isMobile />
    </PageWithTransition>
  ) : (
    <PageWithTransition>
      <TopContainer>
        <Info />
      </TopContainer>
      <MiddleContainer>
        <LeftMiddleContainer>
          {hasUnreadMessages ? <NewMessages /> : <Welcome />}
          <Announcements />
          <ProfileWidget />
          {isMentor ? <ProfileWidget /> : <></>}
        </LeftMiddleContainer>
        <RightMiddleContainer>
          <Concepts />
        </RightMiddleContainer>
      </MiddleContainer>
      <NewestMentors />
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

const RightMiddleContainer = styled.div`
  flex: 1;
`;

export default HomePage;

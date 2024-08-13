import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { selectUserRole } from '../Authentication/userSlice';
import { useAppSelector } from '@/store';

import AccountInfo from './components/AccountInfo';
import {
  CONTENT_WIDTH,
  OUTER_VERTICAL_MARGIN,
  palette,
} from '@/components/variables';
import PageWithTransition from '@/components/PageWithTransition';
import PublicInfo from './components/PublicInfo';
import Text from '@/components/Text';

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const userRole = useAppSelector(selectUserRole);
  const showMentorProfile = userRole === 'mentor';

  return (
    <PageWithTransition>
      {showMentorProfile ? (
        <MentorContainer>
          <Header>
            <Title variant="h1">{t('title')}</Title>
          </Header>
          <Content>
            <AccountInfo role="mentor" />
            <PublicInfo />
          </Content>
        </MentorContainer>
      ) : (
        <MenteeContainer>
          <Title variant="h1">{t('title')}</Title>
        </MenteeContainer>
      )}
    </PageWithTransition>
  );
};

const MentorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: ${OUTER_VERTICAL_MARGIN} auto;
  max-width: ${CONTENT_WIDTH};
  width: ${CONTENT_WIDTH};
`;

const Header = styled.div`
  background-color: ${palette.blue2};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  height: 4rem;
  justify-content: center;
  width: ${CONTENT_WIDTH};
`;

const Title = styled(Text)`
  align-self: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

const MenteeContainer = styled.div`
  align-content: center;
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: ${OUTER_VERTICAL_MARGIN} auto;
  padding: 3rem;
  width: 50vw;
`;

export default ProfilePage;

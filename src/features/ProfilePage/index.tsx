import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { selectUserRole, UserRole } from '../Authentication/userSlice';
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
  const storedUserRole = useAppSelector(selectUserRole);

  const convertUserRole = () => {
    if (storedUserRole === 'admin') return 'admin';
    if (storedUserRole === 'mentor') return 'mentor';
    return 'mentee';
  };
  const userRole: UserRole = convertUserRole();
  const isMentor = userRole === 'mentor';

  return (
    <PageWithTransition>
      {isMentor ? (
        <Container>
          <Header>
            <Text variant="h1">{t('title')}</Text>
          </Header>
          <Content>
            <AccountInfo userRole="mentor" />
            <PublicInfo />
          </Content>
        </Container>
      ) : (
        <AccountInfo userRole={userRole} />
      )}
    </PageWithTransition>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: ${OUTER_VERTICAL_MARGIN} auto;
  max-width: ${CONTENT_WIDTH};
  width: ${CONTENT_WIDTH};
`;

const Header = styled.div`
  align-items: center;
  background-color: ${palette.blue2};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  height: 4rem;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

export default ProfilePage;

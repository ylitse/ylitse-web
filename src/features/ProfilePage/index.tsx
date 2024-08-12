import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { selectUserRole } from '../Authentication/userSlice';
import { useAppSelector } from '@/store';

import {
  CONTENT_WIDTH,
  OUTER_VERTICAL_MARGIN,
  palette,
} from '@/components/variables';
import PageWithTransition from '@/components/PageWithTransition';
import Text from '@/components/Text';

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const userRole = useAppSelector(selectUserRole);
  console.log('The user is a', userRole);

  return (
    <PageWithTransition>
      <Container>
        <Header>
          <Title variant="h1">{t('title')}</Title>
        </Header>
      </Container>
    </PageWithTransition>
  );
};

const Container = styled.div`
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
  align-content: center;
`;

export default ProfilePage;

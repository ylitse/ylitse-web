import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { selectIsMentor } from '../Authentication/userSlice';
import { useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import AccountInfo from './components/AccountInfo';
import {
  CONTENT_WIDTH,
  OUTER_VERTICAL_MARGIN,
  palette,
} from '@/components/constants';
import PageWithTransition from '@/components/PageWithTransition';
import PublicInfo from './components/PublicInfo';
import Text from '@/components/Text';

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const { isTablet } = useGetLayoutMode();
  const isMentor = useAppSelector(selectIsMentor);

  return isTablet ? (
    <PageWithTransition>
      {isMentor ? (
        <MobileContainer>
          <MobileHeader>
            <Text variant="h1">{t('title')}</Text>
          </MobileHeader>
          <AccountInfo isMobile />
          <PublicInfo isMobile />
        </MobileContainer>
      ) : (
        <AccountInfo isMobile />
      )}
    </PageWithTransition>
  ) : (
    <PageWithTransition>
      {isMentor ? (
        <Container>
          <Header>
            <Text variant="h1">{t('title')}</Text>
          </Header>
          <Content>
            <AccountInfo />
            <PublicInfo />
          </Content>
        </Container>
      ) : (
        <AccountInfo />
      )}
    </PageWithTransition>
  );
};

const MobileContainer = styled.div`
  background-color: ${palette.white};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 3rem 0;
  width: 100%;
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: center;
`;

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

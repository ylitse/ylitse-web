import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import Text from '@/components/Text';

type Props = {
  isMobile?: boolean;
};

const ProfileWidget = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('home');

  return (
    <Container isDesktop={!isMobile}>
      <Text variant="h2">{t('profileWidget.title')}</Text>
      <InfoBox>
        <Text>{t('profileWidget.statusMessage')}</Text>
      </InfoBox>
      <InfoBox>
        <Text>{t('profileWidget.status')}</Text>
      </InfoBox>
    </Container>
  );
};

const InfoBox = styled.div`
  background-color: ${palette.blueWhite};
  display: flex;
  margin: 1rem;
  padding: 1rem;
`;

const Container = styled.div<{ isDesktop: boolean }>`
  background-color: ${palette.white};
  gap: 1rem;
  padding: ${({ isDesktop }) => (isDesktop ? '2rem' : '3rem')};

  ${({ isDesktop }) =>
    isDesktop &&
    css`
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
    `}
`;

export default ProfileWidget;

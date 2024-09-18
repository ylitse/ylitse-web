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
      <Text variant="boldBaloo">{t('profileWidget.title')}</Text>
      <MiddleContainer>
        <InfoBox>
          <Text variant="bold">{t('profileWidget.statusMessage')}</Text>
          <Text variant="p">Statusteksti</Text>
        </InfoBox>
        <InfoBox>
          <Text variant="bold">{t('profileWidget.status')}</Text>
          <Text variant="p">Päällä</Text>
        </InfoBox>
      </MiddleContainer>
      <Text variant="p">{t('profileWidget.text')}</Text>
    </Container>
  );
};

const InfoBox = styled.div`
  background-color: ${palette.blueWhite};
  display: flex;
  margin: 1rem 0 1rem 0;
  padding: 1rem 0 1rem 0;
  width: 49%;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: 'row';
  justify-content: space-between;
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

import styled from 'styled-components';

import SvgLogo from '@/static/img/logo.svg';
import Text from '@/components/Text';
import { useTranslation } from 'react-i18next';
import { MOBILE_TRESHOLD } from '@/components/variables';

export const LogoContainer = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Logo />
      <YlitseText variant="logo" color="white">
        {t('navigation.logo')}
      </YlitseText>
    </Container>
  );
};

const YlitseText = styled(Text)`
  @media screen and (max-width: 650px) and (min-width: ${MOBILE_TRESHOLD}px) {
    display: none;
    margin-left: 4%;
  }
`;

const Logo = styled.div`
  background-image: url(${SvgLogo});
  background-size: contain;
  background-repeat: no-repeat;
  height: 40px;
  width: 40px;
  margin-right: 1rem;
  background-color: transparent;
`;

const Container = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  color: white;
  max-width: fit-content;
  margin-left: 10%;

  @media screen and (max-width: 830px) {
    margin-left: 4%;
  }

  @media screen and (max-width: ${MOBILE_TRESHOLD}px) {
    margin-left: 0;
  }
`;

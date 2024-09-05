import styled from 'styled-components';

import SvgLogo from '@/static/img/ylitse-logo.svg';
import Text from '@/components/Text';
import { useTranslation } from 'react-i18next';
import { MOBILE_TRESHOLD } from '@/components/constants';

export const LogoContainer = () => {
  const { t } = useTranslation('common');

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
  background-color: transparent;
  background-image: url(${SvgLogo});
  background-repeat: no-repeat;
  background-size: contain;
  height: 40px;
  margin-right: 1rem;
  width: 40px;
`;

const Container = styled.div`
  align-items: center;
  color: white;
  display: flex;
  height: 50px;
  margin-left: 10%;
  max-width: fit-content;

  @media screen and (max-width: 830px) {
    margin-left: 4%;
  }

  @media screen and (max-width: ${MOBILE_TRESHOLD}px) {
    margin-left: 0;
  }
`;

import styled from 'styled-components';

import links from '@/static/links.json';
import SvgLogo from '@/static/img/ylitse-logo.svg';
import Text from '@/components/Text';
import { useTranslation } from 'react-i18next';
import { MOBILE_TRESHOLD } from '@/components/constants';
import Link from '@/components/Link';

export const LogoContainer = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <Link url={links.sosLapsikylaYlitseUrl}>
        <Logo />
        <YlitseText variant="logo" color="white">
          {t('navigation.logo')}
        </YlitseText>
      </Link>
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
  width: 40px;
`;

const Container = styled.div`
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

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import links from '@/static/links.json';

import { FOOTER_HEIGHT, palette } from '../constants';
import FooterLogo from '@/static/img/footer-logo.svg';
import Text from '../Text';
import Link from '../Link';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <Link url={links.sosLapsikylaUrl}>
        <Text variant="footer">{t('footer')}</Text>
        <FooterImage src={FooterLogo} />
      </Link>
    </Container>
  );
};

const Container = styled.footer`
  background-color: ${palette.blue};
  height: ${FOOTER_HEIGHT};
`;

const FooterImage = styled.img`
  height: ${FOOTER_HEIGHT};
  width: 9rem;
`;

export default Footer;

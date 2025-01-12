import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import links from '@/static/links.json';

import { FOOTER_HEIGHT, palette } from '../constants';
import FooterLogo from '@/static/img/footer-logo.svg';
import Text from '../Text';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <Link href={links.sosLapsikylaUrl} target="_blank">
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

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`;

const FooterImage = styled.img`
  height: ${FOOTER_HEIGHT};
  width: 9rem;
`;

export default Footer;

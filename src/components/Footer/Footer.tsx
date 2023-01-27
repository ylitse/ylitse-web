import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { breakpoints, palette } from '../variables';
import FooterLogo from '@/static/img/footer-logo.svg';
import Text from '../Text';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <FooterText variant="footer">{t('footer')}</FooterText>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  background-color: ${palette.blue};
  bottom: 0;
  display: flex;
  height: 3.5rem;
  justify-content: center;
  left: 0;
  position: relative;
  width: 100vw;
`;

const FooterText = styled(Text)`
  &:after {
    background-color: transparent;
    background-image: url(${FooterLogo});
    background-position: center left;
    background-repeat: no-repeat;
    background-size: contain;
    content: '';
    display: block;
    float: right;
    height: 3.5rem;
    margin-left: 1rem;
    position: relative;
    width: 11rem;
    @media screen and (max-width: ${breakpoints.mobile}) {
      background-image: none;
      content: 'SOS-lapsikylä';
      font-size: 1rem;
      width: 6rem;
    }
  }
`;

export default Footer;

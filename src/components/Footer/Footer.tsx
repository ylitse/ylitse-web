import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import FooterLogo from '@/static/img/footer-logo.svg';
import { palette, basicSourceSansText, breakpoints } from '../variables';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <StyledFooter>
      <StyledFooterText>{t('footer')}</StyledFooterText>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  background-color: ${palette.footerblue};
  width: 100vw;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFooterText = styled.div`
  ${basicSourceSansText};
  font-size: 1rem;
  color: ${palette.darkblue};
  line-height: 3.5rem;
  &:after {
    position: relative;
    content: '';
    display: block;
    float: right;
    background-image: url(${FooterLogo});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center left;
    height: 3.5rem;
    width: 11rem;
    background-color: transparent;
    margin-left: 1rem;
    @media screen and (max-width: ${breakpoints.mobile}) {
      background-image: none;
      content: 'SOS-lapsikylä';
      ${basicSourceSansText};
      font-size: 1rem;
      color: ${palette.darkblue};
      width: 6rem;
    }
  }
`;

export default Footer;

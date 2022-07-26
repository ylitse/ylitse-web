import styled from 'styled-components';
import FooterLogo from '../../static/img/footer-logo.svg';
import * as cssVariables from '../../static/styles/variables';

const Footer = () => {
  return (
    <StyledFooter>
      <StyledFooterText>Palvelun tarjoaa</StyledFooterText>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  background-color: ${cssVariables.palette.footerblue};
  width: 100vw;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFooterText = styled.div`
  font-family: 'Source Sans Pro', cursive;
  font-style: normal;
  font-weight: 600;
  color: ${cssVariables.palette.darkblue};
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
    @media screen and (max-width: ${cssVariables.breakpoints.mobile}) {
      background-image: none;
      content: 'SOS-lapsikylä';
      font-family: 'Source Sans Pro', cursive;
      font-style: normal;
      font-weight: 600;
      color: ${cssVariables.palette.darkblue};
      width: 6rem;
    }
  }
`;

export default Footer;

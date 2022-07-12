import styled from 'styled-components';
import FooterLogo from '@/static/img/footer-logo.svg';

export const StyledFooter = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	background-color: #01A5EC;
	width: 100vw;
	height: 3.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const StyledFooterText = styled.div`
	font-family: 'Source Sans Pro', cursive;
  font-style: normal;
  font-weight: 600;
	color: #1C325D;
	margin-right: 2rem;
`;

export const StyledFooterLogo = styled.div`
	background-image: url(${FooterLogo});
	background-size: contain;
	background-repeat: no-repeat;
  height: 3rem;
	width: 11rem;
	background-color: transparent;

`;
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLogoText = styled.div`
  font-family: 'Baloo 2', cursive;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  height: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
	color: white;
  flex: 1;
	margin-left: 12%;
	max-width: fit-content;
`;

export const StyledNavBarItem = styled.div`
  flex: 1;
  color: white;
	max-width: fit-content;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	
`;

export const StyledNavText = styled.div `

`;

export const StyledNavLink = styled(NavLink)`
	color: white;
	font-family: 'Baloo 2', cursive;
  font-style: normal;
  font-weight: 400;
	text-decoration: none;
	height: 60px;
	line-height: 60px;
	div {
		margin-left:	.5rem;
		margin-right: .5rem;
		padding-left: .5rem;
		padding-right: .5rem;
	}
	&:active {
		background-color: #43BFFF;
		color: #1C325D;
		div {
			height: 30px;
			border-bottom: 1px solid #1C325D;
		}
	}
	&.active {
    background-color: #43BFFF;
		color: #1C325D;
		div {
			height: 40px;
			border-bottom: 1px solid #1C325D;
		}
  }
`;

export const StyledNavBar = styled.div`
  width: 100%;
  height: 60px;
  z-index: 10;
  background-color: #4a2acb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
	position: relative;
`;

export const StyledNavBarItems = styled.div`
	flex: 1;
	margin-right: 12%;
	display: flex;
	justify-content: flex-end;
`;

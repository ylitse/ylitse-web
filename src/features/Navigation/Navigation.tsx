import React from 'react';
import { NavLink } from 'react-router-dom';
import { StyledNavBar, StyledLogo, StyledNavLink, StyledLogoText, StyledNavBarItems } from './Navigation.styles';
import Logo from './logo.svg';

const NavigationBar = () => {
  return (
    <StyledNavBar>
			<StyledLogo src={Logo} />
      <StyledLogoText>YLITSE</StyledLogoText>
      <StyledNavBarItems>
			<StyledNavLink to='/' className="navbar-link"><div>Koti</div></StyledNavLink>
			<StyledNavLink to='/mentorit' className="navbar-link"><div>Mentorit</div></StyledNavLink>
			<StyledNavLink to='/chat' className="navbar-link"><div>Chat</div></StyledNavLink>
			<StyledNavLink to='/info' className="navbar-link"><div>Info</div></StyledNavLink>
			<StyledNavLink to='/signout' className="navbar-link"><div>Kirjaudu ulos</div></StyledNavLink>
      </StyledNavBarItems>
    </StyledNavBar>
  );
};

export default NavigationBar;
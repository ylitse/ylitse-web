import React from 'react';
import { NavLink } from 'react-router-dom';
import { StyledNavBar, StyledNavText, StyledNavLink, StyledLogoText, StyledNavBarItems } from './Navigation.styles';
import Logo from './logo.svg';

const AddNavBarLink = (to: string, text: string) => {
  return (
    <StyledNavLink to={to} className="navbar-link">
      <div>{text}</div>
    </StyledNavLink>
  );
};

const NavigationBar = () => {
  return (
    <StyledNavBar>
      <StyledLogoText>YLITSE</StyledLogoText>
      <StyledNavBarItems>
        {AddNavBarLink('/', 'Koti')}
        {AddNavBarLink('/', 'Mentorit')}
        {AddNavBarLink('/', 'Chat')}
        {AddNavBarLink('/', 'Info')}
        {AddNavBarLink('/', 'Kirjaudu ulos')}
      </StyledNavBarItems>
    </StyledNavBar>
  );
};

export default NavigationBar;

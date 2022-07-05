import {
  StyledNavBar,
  StyledLogo,
  StyledNavLink,
  StyledLogoText,
  StyledNavBarItems,
  StyledNavDropdown,
  StyledInfoMenu,
  StyledNavigationOutsideLink,
  StyledOutsideLinkLogo,
  StyledInfoScreenLink,
	StyledDropdownItems
} from './Navigation.styles';

/**
 * Navigation bar should be added to App.tsx before routers.
 * As pages get done, the to-links should be updated if necessary
 * update the links to "Anna palautetta" and "Käyttöehdot ja tietosuojaseloste"
 */
const NavigationBar = () => {
  return (
    <StyledNavBar>
      <StyledLogo />
      <StyledLogoText>YLITSE</StyledLogoText>
      <StyledNavBarItems>
        <StyledNavLink to="/" className="navbar-link">
          <div>Koti</div>
        </StyledNavLink>
        <StyledNavLink to="/mentorit" className="navbar-link">
          <div>Mentorit</div>
        </StyledNavLink>
        <StyledNavLink to="/chat" className="navbar-link">
          <div>Chat</div>
        </StyledNavLink>
        <StyledNavDropdown>
          <StyledInfoMenu>
            <div>Info</div>
          </StyledInfoMenu>
          <StyledDropdownItems>
            <StyledNavigationOutsideLink>
              <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">Anna palautetta</a>
              <StyledOutsideLinkLogo />
            </StyledNavigationOutsideLink>
            <StyledNavigationOutsideLink>
              <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">Käyttöehdot ja tietosuojaseloste</a>
              <StyledOutsideLinkLogo />
            </StyledNavigationOutsideLink>
            <StyledInfoScreenLink>
              <div>Tiedot palvelusta</div>
            </StyledInfoScreenLink>
          </StyledDropdownItems>
        </StyledNavDropdown>
        <StyledNavLink to="/signout" className="navbar-link">
          <div>Kirjaudu ulos</div>
        </StyledNavLink>
      </StyledNavBarItems>
    </StyledNavBar>
  );
};

export default NavigationBar;

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
              <div>Anna palautetta</div>
              <StyledOutsideLinkLogo />
            </StyledNavigationOutsideLink>
            <StyledNavigationOutsideLink>
              <div>Käyttöehdot ja tietosuojaseloste</div>
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

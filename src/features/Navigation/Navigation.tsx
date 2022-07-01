import { StyledNavBar, StyledLogo, StyledNavLink, StyledLogoText, StyledNavBarItems } from './Navigation.styles';

const NavigationBar = () => {
  return (
    <StyledNavBar>
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

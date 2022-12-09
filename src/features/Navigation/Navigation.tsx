import {
  Logo,
  LogoText,
  NavBar,
  NavBarItems,
  NavLink,
} from './Navigation.styles';
import { NavigationItem } from './types';
import Dropdown from './Dropdown';
import NavigationItems from './NavigationItems';

const dropDownItems: Array<NavigationItem> = [
  {
    text: 'Anna palautetta',
    url: 'https://www.sos-lapsikyla.fi',
  },
  {
    text: 'Käyttöehdot ja tietosuojaseloste',
    url: 'https://www.sos-lapsikyla.fi/tietosuojaselosteet',
  },
];

const navigationItems: Array<NavigationItem> = [
  {
    text: 'Koti',
    url: '/',
  },
  {
    text: 'Mentorit',
    url: '/mentors',
  },
  {
    text: 'Chat',
    url: '/chat',
  },
];

/**
 * Navigation bar should be added to App.tsx before routers.
 * As pages get done, the to-links should be updated if necessary
 * update the links to "Anna palautetta" and "Käyttöehdot ja tietosuojaseloste"
 */
const NavigationBar = () => {
  return (
    <NavBar>
      <Logo />
      <LogoText>YLITSE</LogoText>
      <NavBarItems>
        <NavigationItems items={navigationItems} />
        <Dropdown items={dropDownItems} />
        <NavLink id="logout-link" to="/logout" className="navbar-link">
          <div>Kirjaudu ulos</div>
        </NavLink>
      </NavBarItems>
    </NavBar>
  );
};

export default NavigationBar;

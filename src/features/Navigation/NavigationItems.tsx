import { NavLink } from './Navigation.styles';
import { NavigationItem } from './types';

const NavItem = ({ text, url }: NavigationItem) => {
  return (
    <NavLink to={url} className="navbar-link">
      <div>{text}</div>
    </NavLink>
  );
};

const NavigationItems = ({ items }: { items: Array<NavigationItem> }) => {
  return (
    <>
      {items.map(item => (
        <NavItem key={item.text} text={item.text} url={item.url} />
      ))}
    </>
  );
};

export default NavigationItems;

import {
  DropdownItems,
  InfoMenu,
  NavigationDropdownLink,
  NavDropdown,
  OutsideLinkLogo,
} from './Navigation.styles';
import { NavigationItem } from './types';

const DropDownItem = ({ text, url }: NavigationItem) => {
  return (
    <NavigationDropdownLink>
      <a href={url} target="_blank" rel="noreferrer">
        {text}
      </a>
      <OutsideLinkLogo />
    </NavigationDropdownLink>
  );
};

const Dropwdown = ({ items }: { items: Array<NavigationItem> }) => {
  return (
    <NavDropdown>
      <InfoMenu>
        <div>Info</div>
      </InfoMenu>
      <DropdownItems>
        {items.map(item => (
          <DropDownItem key={item.text} {...item} />
        ))}
        <NavigationDropdownLink onClick={() => console.log('TODO: show modal')}>
          <div>Tietoa palvelusta</div>
        </NavigationDropdownLink>
      </DropdownItems>
    </NavDropdown>
  );
};

export default Dropwdown;

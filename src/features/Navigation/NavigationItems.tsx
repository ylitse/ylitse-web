import styled from 'styled-components';
import { palette } from '@/components/variables';

import { NavLink as RouterNavLink } from 'react-router-dom';

export type NavigationItem = {
  text: string;
  url: string;
};

export const Item = ({ text, url }: NavigationItem) => (
  <Link to={url} className="navbar-link">
    {text}
  </Link>
);

export const Items = ({ items }: { items: Array<NavigationItem> }) => (
  <>
    {items.map(item => (
      <Item key={item.text} {...item} />
    ))}
  </>
);

export const Link = styled(RouterNavLink)`
  text-decoration: none;
  height: 60px;
  line-height: 60px;
  padding: 0 1rem;
  font-family: 'Baloo 2', cursive;
  font-style: normal;
  font-weight: 400;
  line-height: 60px;
  color: ${palette.white};

  &.active,
  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    background-color: ${palette.blue2};
    color: ${palette.darkblue};
  }
`;

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
  color: ${palette.white};
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 700;
  height: 60px;
  line-height: 60px;
  padding: 0 1rem;
  text-decoration: none;

  &.active,
  &:hover {
    background-color: ${palette.blue};
    color: ${palette.blueDark};
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  &.active {
    cursor: default;
  }
`;

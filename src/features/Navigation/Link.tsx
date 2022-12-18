import { NavLink as RouterNavLink } from 'react-router-dom';
import styled from 'styled-components';
import { palette } from '@/components/variables';

export const Link = styled(RouterNavLink)`
  text-decoration: none;
  height: 60px;
  line-height: 60px;
  padding: 0 1rem;

  &:active {
    background-color: ${palette.blue2};
    text-decoration: none;
    color: ${palette.darkblue};
    div {
      height: 30px;
      border-bottom: 1px solid ${palette.darkblue};
    }
  }
  &.active {
    text-decoration: none;
    background-color: ${palette.blue2};
    color: ${palette.darkblue};
    div {
      height: 40px;
      border-bottom: 1px solid ${palette.darkblue};
    }
  }
  &:hover {
    text-decoration: none;
    background-color: ${palette.blue2};
    color: ${palette.darkblue};
    div {
      height: 40px;
      border-bottom: 1px solid ${palette.darkblue};
    }
  }
`;

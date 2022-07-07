import { NavLink as RouterNavLink } from 'react-router-dom';
import styled from 'styled-components';
import SvgLogo from '../../static/img/logo.svg';
import Outsidelink from '../../static/img/outsidelink.svg';

export const LogoText = styled.div`
  font-family: 'Baloo 2', cursive;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  height: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
  flex: 1;

  max-width: fit-content;
`;

export const Logo = styled.div`
  background-image: url(${SvgLogo});
  background-size: contain;
  background-repeat: no-repeat;
  height: 40px;
  width: 40px;
  margin-left: 12%;
  margin-right: 1rem;
  background-color: transparent;
`;

export const NavBarItem = styled.div`
  flex: 1;
  color: white;
  max-width: fit-content;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavLink = styled(RouterNavLink)`
  color: white;
  font-family: 'Baloo 2', cursive;
  font-style: normal;
  font-weight: 400;
  text-decoration: none;
  height: 60px;
  line-height: 60px;
  div {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  &:active {
    background-color: #43bfff;
    text-decoration: none;
    color: #1c325d;
    div {
      height: 30px;
      border-bottom: 1px solid #1c325d;
    }
  }
  &.active {
    text-decoration: none;
    background-color: #43bfff;
    color: #1c325d;
    div {
      height: 40px;
      border-bottom: 1px solid #1c325d;
    }
  }
  &:hover {
    text-decoration: none;
    background-color: #43bfff;
    color: #1c325d;
    div {
      height: 40px;
      border-bottom: 1px solid #1c325d;
    }
  }
`;

export const NavBar = styled.div`
  width: 100%;
  height: 60px;
  z-index: 10;
  background-color: #4a2acb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
`;

export const NavBarItems = styled.div`
  flex: 1;
  margin-right: 12%;
  display: flex;
  justify-content: flex-end;
`;

export const NavDropdown = styled.div`
  position: relative;
`;

export const NavigationDropdownLink = styled.div`
  display: none;
  pointer-events: none;
  color: #4a2acb;
  background-color: #43bfff;
  font-family: 'Baloo 2', cursive;
  font-style: normal;
  font-weight: 700;
  text-decoration: none;
  height: 58px;
  line-height: 58px;
  div,
  a {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    color: #1c325d;
    text-decoration: none;
  }
  &:active {
    a,
    div {
      height: 30px;
      border-bottom: 1px solid #1c325d;
    }
  }
  &.active {
    a,
    div {
      height: 40px;
      border-bottom: 1px solid #1c325d;
    }
  }
  &:hover {
    a,
    div {
      height: 40px;
      border-bottom: 1px solid #1c325d;
    }
  }
  ${NavDropdown}:hover & {
    display: flex;
    pointer-events: all;
  }
`;

export const OutsideLinkLogo = styled.div`
  flex: 0 0 auto;
  align-self: center;
  justify-self: flex-start;
  margin-left: 0 !important;
  margin-right: 1rem;
  border-bottom: none !important;
  background-image: url(${Outsidelink});
  background-size: contain;
  background-repeat: no-repeat;
  height: 1rem !important;
  width: 1rem;
  background-color: transparent;
`;

export const InfoMenu = styled.div`
  color: white;
  font-family: 'Baloo 2', cursive;
  font-style: normal;
  font-weight: 400;
  text-decoration: none;
  height: 60px;
  line-height: 60px;
  width: 4rem;
  max-width: 4rem;
  div {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  &:active {
    background-color: #43bfff;
    text-decoration: none;
    color: #1c325d;
    div {
      height: 30px;
      border-bottom: 1px solid #1c325d;
    }
  }
  &.active {
    text-decoration: none;
    background-color: #43bfff;
    color: #1c325d;
    div {
      height: 40px;
      border-bottom: 1px solid #1c325d;
    }
  }
  &:hover {
    text-decoration: none;
    background-color: #43bfff;
    color: #1c325d;
    div {
      height: 40px;
      border-bottom: 1px solid #1c325d;
    }
  }
  ${NavDropdown}:hover & {
    text-decoration: none;
    background-color: #43bfff;
    color: #1c325d;
    div {
      height: 40px;
      border-bottom: 1px solid #1c325d;
    }
  }
`;

export const DropdownItems = styled.div`
  position: absolute;
  width: max-content;
`;

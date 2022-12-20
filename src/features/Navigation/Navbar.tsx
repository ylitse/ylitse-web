import { useMobileMode } from '@/hooks/useMobileMode';

import { palette } from '@/components/variables';
import styled, { css } from 'styled-components';

import { Items, Item } from './NavigationItems';
import { LeftContainer } from './LeftContainer';
import { InfoDropdown } from './InfoDropdown';
import { MobileDropdown } from './MobileDropdown';
import { LangDropdown } from './LangDropdown';

const navigationItems = [
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

export const Navbar = () => {
  const isMobile = useMobileMode();

  return (
    <>
      {isMobile ? (
        <Container isMobile>
          <LeftContainer />
          <MobileDropdown items={navigationItems} />
        </Container>
      ) : (
        <Container>
          <LeftContainer />
          <RightContainer>
            <Items items={navigationItems} />
            <InfoDropdown />
            <LangDropdown />
            <Item text="Kirjaudu ulos" url="/logout" />
          </RightContainer>
        </Container>
      )}
    </>
  );
};

export const Container = styled.div<{ isMobile?: boolean }>`
  width: 100%;
  height: 60px;
  z-index: 10;
  background-color: ${palette.purple};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;

  ${({ isMobile }) =>
    isMobile &&
    css`
      border-bottom: solid 0.5rem ${palette.blue2};
    `}
`;

export const RightContainer = styled.div`
  flex: 1;
  margin-right: 12%;
  display: flex;
  justify-content: flex-end;
`;

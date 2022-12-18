import type { NavigationItem } from './NavigationItems';

import styled from 'styled-components';

import { Items, Item } from './NavigationItems';
import { LeftContainer } from './LeftContainer';
import { InfoDropdown } from './InfoDropdown';
import { Routes, Route } from 'react-router-dom';
import MentorPage from '@/features/MentorPage';
import Logout from '@/features/Logout';

import { palette } from '@/components/variables';

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

const Navigation = () => {
  return (
    <>
      <Container>
        <LeftContainer />
        <RightContainer>
          <Items items={navigationItems} />
          <InfoDropdown />
          <Item text="Kirjaudu ulos" url="/logout" />
        </RightContainer>
      </Container>

      <Routes>
        <Route path="/*" element={<div>KOTISIVU</div>} />
        <Route path="/chat" element={<div>CHATSIVU</div>} />
        <Route path="/mentors" element={<MentorPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export const Container = styled.div`
  width: 100%;
  height: 60px;
  z-index: 10;
  background-color: ${palette.purple};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
`;

export const RightContainer = styled.div`
  flex: 1;
  margin-right: 12%;
  display: flex;
  justify-content: flex-end;
`;

export const DropdownItems = styled.div`
  position: absolute;
  width: max-content;
`;

export default Navigation;

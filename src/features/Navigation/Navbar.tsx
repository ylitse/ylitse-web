import { useMobileMode } from '@/hooks/useMobileMode';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import styled, { css } from 'styled-components';

import { Items, Item } from './NavigationItems';
import { LogoContainer } from './LogoContainer';
import InfoDropdown from './InfoDropdown';
import MobileDropdown from './MobileDropdown';
import LangDropdown from './LanguageDropdown';

export const Navbar = () => {
  const isMobile = useMobileMode();
  const { t } = useTranslation('common');

  const navigationItems = [
    {
      text: t('navigation.home'),
      url: '/',
    },
    {
      text: t('navigation.mentors'),
      url: '/mentors',
    },
    {
      text: t('navigation.chat'),
      url: '/chat',
    },
  ];

  return (
    <>
      {isMobile ? (
        <Container isMobile>
          <LogoContainer />
          <MobileDropdown items={navigationItems} />
        </Container>
      ) : (
        <Container>
          <LogoContainer />
          <RightContainer>
            <Items items={navigationItems} />
            <InfoDropdown />
            <LangDropdown />
            <Item text={t('navigation.logout')} url="/logout" />
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
      padding: 0 1.5rem;
    `}
`;

export const RightContainer = styled.div`
  display: flex;
  margin-right: 10%;

  @media screen and (max-width: 830px) {
    margin-right: 0;
  }

  @media screen and (max-width: 650px) {
    margin-right: 4%;
  }
`;

import { useComponentVisible } from '@/hooks/useComponentShow';

import type { NavigationItem } from './NavigationItems';

import { infoItems } from './InfoDropdown';

import { palette } from '@/components/variables';
import styled from 'styled-components';

import Text from '@/components/Text';
import { ChevronUp } from '@/components/Icons/ChevronUp';
import { ChevronDown } from '@/components/Icons/ChevronDown';
import { NavLink as RouterNavLink } from 'react-router-dom';

type Props = {
  items: Array<NavigationItem>;
};
export const MobileDropdown: React.FC<Props> = ({ items }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  return (
    <Container>
      <MenuButton
        ref={ref}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <Text variant={'linkMobile'} color={'white'}>
          Valikko
        </Text>
        {isComponentVisible ? (
          <ChevronUp size={8} color={'white'} />
        ) : (
          <ChevronDown size={8} color="white" />
        )}
      </MenuButton>
      {isComponentVisible && (
        <MenuContainer>
          {items.map(item => (
            <UnstyledRouteLink key={item.text} to={item.url}>
              <Text variant="linkMobile" color="purple">
                {item.text}
              </Text>
            </UnstyledRouteLink>
          ))}
          <Divider />
          {infoItems.map(item => (
            <UnstyledLink key={item.text}>
              <Text variant="linkMobile" color="purple">
                {item.text}
              </Text>
            </UnstyledLink>
          ))}
          <Divider />
          <UnstyledRouteLink to="/logout">
            <Text variant="linkMobile" color="purple">
              Kirjaudu ulos
            </Text>
          </UnstyledRouteLink>
        </MenuContainer>
      )}
    </Container>
  );
};

const Container = styled.div``;

const MenuButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  text-align: center;
  padding: 0 1rem;
`;

const MenuContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 2rem;
  background-color: ${palette.white};
  display: flex;
  flex-direction: column;
`;

const UnstyledLink = styled.a`
  padding: 0 2rem;
`;

const UnstyledRouteLink = styled(RouterNavLink)`
  padding: 0 2rem;
  text-decoration: none;
`;

const Divider = styled.div`
  border-bottom: 2px solid ${palette.blue2};
`;

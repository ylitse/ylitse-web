import type { NavigationItem } from './NavigationItems';

import { useComponentVisible } from '@/hooks/useComponentShow';

import { palette } from '@/components/variables';
import styled, { css } from 'styled-components';
import chevronup from '@/static/icons/chevron_up.svg';
import chevrondown from '@/static/icons/chevron_down.svg';
import { DropdownItem, DropdownLink } from './DropdownItem';
import Text from '@/components/Text';

const dropDownItems: Array<NavigationItem> = [
  {
    text: 'Anna palautetta',
    url: 'https://www.sos-lapsikyla.fi',
  },
  {
    text: 'Käyttöehdot ja tietosuojaseloste',
    url: 'https://www.sos-lapsikyla.fi/tietosuojaselosteet',
  },
];

export const InfoDropdown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  return (
    <Container>
      <InfoButton
        ref={ref}
        isExpanded={isComponentVisible}
        onClick={() => setIsComponentVisible(true)}
      >
        <Text
          variant={'link'}
          color={isComponentVisible ? 'darkblue' : 'white'}
        >
          Info
        </Text>
        <img
          src={isComponentVisible ? chevronup : chevrondown}
          width="8px"
          height="8px"
        />
      </InfoButton>
      {isComponentVisible && (
        <MenuContainer>
          {dropDownItems.map(item => (
            <DropdownItem key={item.text} {...item} />
          ))}
          <DropdownLink onClick={() => console.log('TODO: show modal')}>
            <Text variant="linkBold" color="purple">
              Tietoa palvelusta
            </Text>
          </DropdownLink>
        </MenuContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const InfoButton = styled.button<{ isExpanded?: boolean }>`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  text-align: center;
  padding: 0 1rem;

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      background-color: ${palette.white};
    `}

  &:hover {
    background-color: ${palette.blue2};
  }
`;

const MenuContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: max-content;
  margin-left: -1px;

  div:first-of-type {
    border-top: 0.1rem solid ${palette.midgray};
  }

  div:last-of-type {
    border-radius: 0 0 16px 16px;
    border-bottom: 2px solid ${palette.purple};
  }
`;

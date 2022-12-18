import type { NavigationItem } from './NavigationItems';

import styled from 'styled-components';
import Dropdown from '../../components/Dropdown';
import { DropdownItem, DropdownLink } from './DropdownItem';
import Text from '@/components/Text';

import { palette } from '@/components/variables';

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
  return (
    <Dropdown
      button={
        <InfoButton>
          <Text variant="link" color="white">
            Info
          </Text>
        </InfoButton>
      }
      content={
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
      }
    />
  );
};

const InfoButton = styled.div`
  height: 60px;
  width: 4rem;
  max-width: 4rem;
  text-align: center;

  &:hover {
    background-color: ${palette.blue2};
  }
`;

const MenuContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: max-content;
`;

export const DropdownItems = styled.div`
  position: absolute;
  width: max-content;
`;

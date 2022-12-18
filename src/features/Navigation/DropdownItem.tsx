import type { NavigationItem } from './NavigationItems';

import styled from 'styled-components';
import { palette } from '@/components/variables';

import Outsidelink from '@/static/icons/outsidelink.svg';
import Text from '@/components/Text';

export const DropdownItem = ({ text, url }: NavigationItem) => {
  return (
    <DropdownLink>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <Text variant="linkBold" color="purple">
          {text}
        </Text>
      </a>
      <OutsideLinkLogo />
    </DropdownLink>
  );
};

export const OutsideLinkLogo = styled.div`
  flex: 0 0 auto;
  align-self: center;
  justify-self: flex-start;
  margin-right: 1rem;
  background-image: url(${Outsidelink});
  background-size: contain;
  background-repeat: no-repeat;
  height: 1rem;
  width: 1rem;
  background-color: transparent;
`;
export const DropdownLink = styled.div`
  gap: 0.5rem;
  display: flex;
  background-color: ${palette.blue2};
  height: 58px;
  padding-left: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${palette.footerblue};
  }
`;

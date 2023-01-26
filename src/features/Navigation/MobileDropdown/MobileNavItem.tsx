import { palette } from '@/components/variables';
import styled, { css } from 'styled-components';

import Text from '@/components/Text';
import { NavLink as RouterNavLink } from 'react-router-dom';

type Props = {
  text: string;
  url: string;
  currentLocation: string;
};

export const NavigationItem: React.FC<Props> = ({
  text,
  url,
  currentLocation,
}) => {
  const isCurrent = currentLocation === url;

  return (
    <UnstyledRouteLink to={url} isCurrent={isCurrent}>
      <Text
        variant={isCurrent ? 'linkDisabledMobile' : 'linkMobile'}
        color={isCurrent ? 'blueDark' : 'purple'}
      >
        {text}
      </Text>
    </UnstyledRouteLink>
  );
};

const UnstyledRouteLink = styled(RouterNavLink)<{ isCurrent: boolean }>`
  line-height: 56px;
  padding: 0 2rem;
  text-decoration: none;

  ${({ isCurrent }) =>
    isCurrent &&
    css`
      background-color: ${palette.blue};
    `}
`;

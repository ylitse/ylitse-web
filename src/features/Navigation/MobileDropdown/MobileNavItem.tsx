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
      <LinkText
        variant="link"
        color={isCurrent ? 'blueDark' : 'purple'}
        isCurrent={isCurrent}
      >
        {text}
      </LinkText>
    </UnstyledRouteLink>
  );
};

const UnstyledRouteLink = styled(RouterNavLink)<{ isCurrent: boolean }>`
  padding: 0 2rem;
  text-decoration: none;

  ${({ isCurrent }) =>
    isCurrent &&
    css`
      background-color: ${palette.blue};
    `}
`;

const LinkText = styled(Text)<{ isCurrent: boolean }>`
  ${({ isCurrent }) =>
    isCurrent &&
    css`
      text-decoration: underline;
      text-underline-offset: 4px;
    `}
`;

import { palette } from '@/components/variables';
import styled, { css } from 'styled-components';

import { NavLink as RouterNavLink } from 'react-router-dom';
import Text from '@/components/Text';

type Props = {
  currentLocation: string;
  hasNotification?: boolean;
  text: string;
  url: string;
};

export const NavigationItem: React.FC<Props> = ({
  currentLocation,
  hasNotification,
  text,
  url,
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
      {hasNotification && <NotificationCircle isCurrent={isCurrent} />}
    </UnstyledRouteLink>
  );
};

const UnstyledRouteLink = styled(RouterNavLink)<{ isCurrent: boolean }>`
  padding: 0 2rem;
  text-decoration: none;

  ${({ isCurrent }) =>
    isCurrent &&
    css`
      background-color: ${palette.blue2};
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

const NotificationCircle = styled.div<{ isCurrent: boolean }>`
  background-color: ${palette.orange};
  ${({ isCurrent }) => isCurrent && `border: 1px solid ${palette.blueDark};`}
  border-radius: 50%;
  height: 10px;
  left: 2.4rem;
  position: relative;
  top: -2.2rem;
  width: 10px;
`;

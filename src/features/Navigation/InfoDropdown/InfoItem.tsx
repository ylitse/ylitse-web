import type { NavigationItem } from '../NavigationItems';

import styled from 'styled-components';
import { NAVIGATION_HEIGHT, palette } from '@/components/variables';

import Outsidelink from '@/static/icons/outsidelink.svg';
import Text from '@/components/Text';

export const InfoItem = ({ text, url }: NavigationItem) => (
  <Container>
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <Text variant="link" color="purple">
        {text}
      </Text>
    </a>
    <OutsideLinkLogo />
  </Container>
);

export const Container = styled.button`
  background: transparent;
  background-color: ${palette.white};
  border: none;
  border-left: 2px solid ${palette.purple};
  border-right: 2px solid ${palette.purple};
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  height: ${NAVIGATION_HEIGHT};
  padding-left: 1rem;

  &:hover {
    background-color: ${palette.blueLight};
  }
`;

const OutsideLinkLogo = styled.span`
  align-self: center;
  background-color: transparent;
  background-image: url(${Outsidelink});
  background-repeat: no-repeat;
  background-size: contain;
  flex: 0 0 auto;
  height: 1rem;
  justify-self: flex-start;
  margin-right: 1rem;
  width: 1rem;
`;

import styled, { css } from 'styled-components';
import React, { useEffect, useState } from 'react';
import {
  breakpoints,
  spacing,
  palette,
  Color,
  CONTENT_WIDTH,
  NAVIGATION_HEIGHT,
  FOOTER_HEIGHT,
  OUTER_VERTICAL_MARGIN,
} from '../variables';
import { useMobileMode } from '@/hooks/useMobileMode';

type Props = {
  isMentorPage?: boolean;
  children: React.ReactNode;
};

const TRANSITION_LENGTH = 0.7;

const PageWithTransition: React.FC<Props> = ({
  isMentorPage = false,
  children,
}) => {
  const [isTransition, setIsTransition] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const isMobile = useMobileMode();

  useEffect(() => {
    setIsTransition(true);
    setTimeout(() => {
      setShowContent(true);
    }, TRANSITION_LENGTH * 1000);
  }, []);

  return (
    <Container>
      {!showContent ? null : isMobile ? (
        children
      ) : (
        <Content isMentorPage={isMentorPage}>{children}</Content>
      )}
      <Layer
        role="transition"
        isTransition={isTransition}
        color="blue2"
        delay={0}
      />
      <Layer
        role="transition"
        isTransition={isTransition}
        color="purple"
        delay={0.3}
      />
      <Layer
        role="transition"
        isTransition={isTransition}
        color="white"
        delay={0.12}
      />
      <Layer
        role="transition"
        isTransition={isTransition}
        color="orange2"
        delay={0.08}
      />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.blueLight};
  display: flex;
  flex-direction: column;
  height: auto;
  left: 0;
  min-height: calc(100vh - ${NAVIGATION_HEIGHT} - ${FOOTER_HEIGHT});
  position: relative;
  top: 0;
  width: 100vw;
`;

const Content = styled.div<{
  isMentorPage: boolean;
}>`
  display: flex;
  flex-direction: column;
  margin: ${OUTER_VERTICAL_MARGIN} auto;
  max-width: ${CONTENT_WIDTH};
  width: ${CONTENT_WIDTH};

  ${({ isMentorPage }) =>
    isMentorPage &&
    css`
      @media screen and (max-width: 1500px) {
        max-width: calc(100vw - (${spacing.layout_spacing} * 2));
        width: 1130px;
      }
    `};

  @media screen and (max-width: ${breakpoints.mobile}) {
    flex: 1;
  }
`;

const Layer = styled.div<{
  isTransition: boolean;
  color: Color;
  delay: number;
}>`
  background: ${({ color }) => palette[color]};
  bottom: auto;
  height: 100%;
  left: -100%;
  position: absolute;
  right: auto;
  top: auto;
  transition: all ${TRANSITION_LENGTH}s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: ${({ delay }) => delay}s;
  width: 100%;

  ${({ isTransition }) =>
    isTransition &&
    css`
      left: 100%;
    `}
`;

export default PageWithTransition;

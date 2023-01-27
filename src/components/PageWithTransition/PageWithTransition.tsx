import styled, { css } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { breakpoints, spacing, palette, Color } from '../variables';
import { useMobileMode } from '@/hooks/useMobileMode';

type Props = {
  children: React.ReactNode;
};

const TRANSITION_LENGTH = 0.7;

const PageWithTransition: React.FC<Props> = ({ children }) => {
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
        <Content>{children}</Content>
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
  min-height: calc(100vh - 60px - 3.5rem);
  position: relative;
  top: 0;
  width: 100vw;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  margin: auto;
  margin-bottom: ${spacing.layout_outer_spacing};
  margin-top: ${spacing.layout_outer_spacing};
  max-width: 76vw;
  @media screen and (max-width: 1500px) {
    width: 1130px;
    max-width: calc(100vw - (${spacing.layout_spacing} * 2));
  }

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

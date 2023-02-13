import styled, { css } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { palette, Color, NAVIGATION_HEIGHT, FOOTER_HEIGHT } from '../variables';

type Props = {
  children: React.ReactNode;
};

const TRANSITION_LENGTH = 0.7;

const PageWithTransition: React.FC<Props> = ({ children }) => {
  const [isTransition, setIsTransition] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setIsTransition(true);
    setTimeout(() => {
      setShowContent(true);
    }, TRANSITION_LENGTH * 1000);
  }, []);

  return (
    <Container>
      {showContent && children}
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

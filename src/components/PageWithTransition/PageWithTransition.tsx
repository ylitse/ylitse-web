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
      <Layer isTransition={isTransition} color="blue2" delay={0} />
      <Layer isTransition={isTransition} color="purple" delay={0.3} />
      <Layer isTransition={isTransition} color="white" delay={0.12} />
      <Layer isTransition={isTransition} color="orange2" delay={0.08} />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.lightblue};
  position: relative;
  width: 100vw;
  height: auto;
  min-height: calc(100vh - 60px - 3.5rem);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  max-width: 76vw;
  height: auto;
  margin: auto;
  margin-top: ${spacing.layout_outer_spacing};
  margin-bottom: ${spacing.layout_outer_spacing};
  display: flex;
  flex-direction: column;
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
  position: absolute;
  width: 100%;
  height: 100%;
  top: auto;
  left: -100%;
  bottom: auto;
  right: auto;
  transition: all ${TRANSITION_LENGTH}s cubic-bezier(0.645, 0.045, 0.355, 1);

  background: ${({ color }) => palette[color]};

  transition-delay: ${({ delay }) => delay}s;

  ${({ isTransition }) =>
    isTransition &&
    css`
      left: 100%;
    `}
`;

export default PageWithTransition;

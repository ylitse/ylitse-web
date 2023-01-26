import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { palette } from '../variables';

type Props = {
  text: string;
  isSelected: boolean;
  shouldShake: boolean;
  onToggle: (text: string) => void;
};

const Chip: React.FC<Props> = ({ text, isSelected, shouldShake, onToggle }) => {
  return (
    <StyledChip
      key={text}
      value={text}
      onClick={() => onToggle(text)}
      isSelected={isSelected}
      shouldShake={shouldShake}
    >
      {text}
    </StyledChip>
  );
};

const shakeAnimation = keyframes`
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
`;

const StyledChip = styled.button<{ isSelected: boolean; shouldShake: boolean }>`
  appearance: none;
  border: none;
  border-radius: 1.75rem;
  cursor: pointer;
  flex: 0 0 auto;
  font-family: 'Source Sans Pro';
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 400;
  height: 2.75rem;
  line-height: 1.1rem;
  margin: 0.5rem;
  padding: 0.75rem 1.25rem;

  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: ${palette.purple};
          color: ${palette.white};
          &:hover {
            background-color: ${palette.purple};
          }
        `
      : css`
          background-color: ${palette.palepurple};
          color: ${palette.darkblue};
          &:hover {
            background-color: ${palette.hoverpurple};
          }
        `}

  ${({ shouldShake }) =>
    shouldShake &&
    css`
      animation: ${shakeAnimation} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97)
        both;
      backface-visibility: hidden;
      perspective: 1000px;
      transform: translate3d(0, 0, 0);
    `}
`;

export default Chip;

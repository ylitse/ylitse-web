import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { basicSourceSansText, palette } from '../variables';

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
  flex: 0 0 auto;
  padding: 0.75rem 1.25rem;
  ${basicSourceSansText};
  line-height: 100%;
  border-radius: 1.75rem;
  margin: 0.5rem;
  height: 2.75rem;
  appearance: none;
  border: none;
  cursor: pointer;

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
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    `}
`;

export default Chip;

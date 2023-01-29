import React from 'react';
import styled, { css } from 'styled-components';
import Text from '../Text';
import { animations, palette } from '../variables';

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
      <Text variant="chip" color={isSelected ? 'white' : 'blueDark'}>
        {text}
      </Text>
    </StyledChip>
  );
};

const StyledChip = styled.button<{ isSelected: boolean; shouldShake: boolean }>`
  appearance: none;
  border: none;
  border-radius: 1.75rem;
  cursor: pointer;
  flex: 0 0 auto;
  height: 2.75rem;
  padding: 0.75rem 1.25rem;

  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: ${palette.purple};
          &:hover {
            background-color: ${palette.purple};
          }
        `
      : css`
          background-color: ${palette.purplePale};
          &:hover {
            background-color: ${palette.purpleHover};
          }
        `}

  ${({ shouldShake }) =>
    shouldShake &&
    css`
      animation: ${animations.shake}
      backface-visibility: hidden;
      perspective: 1000px;
      transform: translate3d(0, 0, 0);
    `}
`;

export default Chip;

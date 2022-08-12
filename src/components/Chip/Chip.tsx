import styled from 'styled-components';
import React from 'react';
import * as cssVariables from '../variables';

/**
 * Creates a selectable chip
 */

type Props = {
  key: string;
  text: string;
};

const Chip: React.FC<Props> = ({ text }) => {
  const [isChipSelected, setChipSelected] = React.useState(false);

  const handleChipClick = () => setChipSelected(!isChipSelected);

  return (
    <StyledChip
      value={text}
      onClick={handleChipClick}
      isSelected={isChipSelected}
    >
      {text}
    </StyledChip>
  );
};

const StyledChip = styled.button<{ isSelected: boolean }>`
  flex: 0 0 auto;
  background-color: ${props =>
    props.isSelected
      ? cssVariables.palette.purple
      : cssVariables.palette.palepurple};
  padding: 0.75rem 1.25rem;
  ${cssVariables.basicSourceSansText};
  line-height: 100%;
  color: ${props =>
    props.isSelected
      ? cssVariables.palette.white
      : cssVariables.palette.darkblue};
  border-radius: 1.75rem;
  margin: 0.5rem;
  height: 2.75rem;
  appearance: none;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.isSelected
        ? cssVariables.palette.purple
        : cssVariables.palette.hoverpurple};
  }
`;

export default Chip;

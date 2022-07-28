import { ChipProps } from './types';
import styled from 'styled-components';
import React from 'react';
import * as cssVariables from '@/static/styles/variables';
import DeleteActiveIconImg from '@/static/img/icon-delete-active.svg';

/**
 * Layout to one Skill Chip
 */

const Chip: React.FC<ChipProps> = ({ text }) => {
  const [chipSelected, setChipSelected] = React.useState(false);

  const handleChipClick = () => setChipSelected(!chipSelected);

  if (chipSelected) {
    return (
      <StyledSelectedChip key={text} value={text} onClick={handleChipClick}>
        {text}
      </StyledSelectedChip>
    );
  } else {
    return (
      <StyledChip key={text} value={text} onClick={handleChipClick}>
        {text}
      </StyledChip>
    );
  }
};

const StyledSelectedChip = styled.button`
  flex: 0 0 auto;
  background-color: ${cssVariables.palette.purple};
  padding: 0.75rem 1.25rem;
  font-family: 'Source Sans Pro', cursive;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 100%;
  color: white;
  border-radius: 1.75rem;
  margin: 0.5rem;
  height: 2.75rem;
  appearance: none;
  border: none;
  background-image: url(${DeleteActiveIconImg});
  background-size: 1rem;
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 3rem;
`;

const StyledChip = styled.button`
  flex: 0 0 auto;
  background-color: ${cssVariables.palette.palepurple};
  padding: 0.75rem 1.25rem;
  font-family: 'Source Sans Pro', cursive;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 100%;
  color: ${cssVariables.palette.darkblue};
  border-radius: 1.75rem;
  margin: 0.5rem;
  height: 2.75rem;
  appearance: none;
  border: none;
  &:hover {
    background-color: #cdcbff;
  }
`;

export default Chip;

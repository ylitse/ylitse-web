import { ChipProps } from './types';
import styled from 'styled-components';
import React from 'react';
import * as cssVariables from '../../static/styles/variables';
import DeleteActiveIconImg from '../../static/img/icon-delete-active.svg';

/**
 * Layout to one Skill Chip. Each chip has a state to tell if it is
 * selected. State defines the color etc of the button on styled
 * element css
 */

const Chip: React.FC<ChipProps> = ({ text }) => {
  const [isChipSelected, setChipSelected] = React.useState(false);

  const handleChipClick = () => setChipSelected(!isChipSelected);

  return (
    <StyledChip
      key={text}
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
  font-family: 'Source Sans Pro', cursive;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
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
  background-image: ${props =>
    props.isSelected ? `url(${DeleteActiveIconImg})` : 'none'};
  background-size: 1rem;
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: ${props => (props.isSelected ? '3rem' : '1.25rem')};
  &:hover {
    background-color: ${props =>
      props.isSelected ? cssVariables.palette.purple : '#cdcbff'};
  }
`;

export default Chip;

import { ChipProps } from './types';
import styled from 'styled-components';
import React from 'react';
import * as cssVariables from '../CommonTextStyles/variables';

/**
 * Creates a non-selectable chip
 */

const SimpleChip: React.FC<ChipProps> = ({ text }) => {
  return (
    <StyledSimpleChip key={text} value={text}>
      {text}
    </StyledSimpleChip>
  );
};

const StyledSimpleChip = styled.button`
  flex: 0 0 auto;
  background-color: ${cssVariables.palette.lightblue};
  padding: 0.5rem 1rem;
  font-family: 'Source Sans Pro', cursive;
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1rem;
  color: ${cssVariables.palette.darkblue};
  border-radius: 1.75rem;
  margin: 0.5rem;
  height: 2rem;
  appearance: none;
  border: none;
`;

export default SimpleChip;

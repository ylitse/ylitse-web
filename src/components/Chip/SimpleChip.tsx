import styled from 'styled-components';
import React from 'react';
import { palette } from '../variables';

/**
 * Creates a non-selectable chip
 */

type Props = {
  text: string;
};

const SimpleChip: React.FC<Props> = ({ text }) => {
  return (
    <StyledSimpleChip key={text} value={text}>
      {text}
    </StyledSimpleChip>
  );
};

const StyledSimpleChip = styled.button`
  flex: 0 0 auto;
  background-color: ${palette.lightblue};
  padding: 0.5rem 1rem;
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1rem;
  color: ${palette.darkblue};
  border-radius: 1.75rem;
  margin: 0.5rem;
  height: 2rem;
  appearance: none;
  border: none;
`;

export default SimpleChip;

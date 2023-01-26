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
  appearance: none;
  background-color: ${palette.blueLight};
  border: none;
  border-radius: 1.75rem;
  color: ${palette.blueDark};
  flex: 0 0 auto;
  font-family: 'Source Sans Pro';
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  height: 2rem;
  line-height: 1rem;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
`;

export default SimpleChip;

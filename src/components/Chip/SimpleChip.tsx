import styled from 'styled-components';
import React from 'react';
import * as cssVariables from '../variables';

/**
 * Creates a non-selectable chip
 */

type Props = {
  key: string;
  text: string;
};

const SimpleChip: React.FC<Props> = ({ key, text }) => {
  return (
    <StyledSimpleChip key={key} value={text}>
      {text}
    </StyledSimpleChip>
  );
};

const StyledSimpleChip = styled.button`
  flex: 0 0 auto;
  background-color: ${cssVariables.palette.lightblue};
  padding: 0.5rem 1rem;
  ${cssVariables.basicSourceSansText};
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

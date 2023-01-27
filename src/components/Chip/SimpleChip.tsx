import styled from 'styled-components';
import React from 'react';
import { palette } from '../variables';
import Text from '../Text';

/**
 * Creates a non-selectable chip
 */

type Props = {
  text: string;
};

const SimpleChip: React.FC<Props> = ({ text }) => {
  return (
    <StyledSimpleChip key={text} value={text}>
      <Text variant="chip">{text}</Text>
    </StyledSimpleChip>
  );
};

const StyledSimpleChip = styled.button`
  appearance: none;
  background-color: ${palette.blueLight};
  border: none;
  border-radius: 1.75rem;
  flex: 0 0 auto;
  height: 2rem;
  line-height: 1rem;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
`;

export default SimpleChip;

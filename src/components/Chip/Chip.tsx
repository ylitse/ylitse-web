import { ChipProps } from './types';
import styled from 'styled-components';

/** To do:
 * Mapping in parent element, this only for one chip
 */

// eslint-disable-next-line react/prop-types
const Chip : React.FC<ChipProps> = ({ text }) => {
  return (
        <StyledChip key={text} value={text}>
          {text}
        </StyledChip>
  );
};

const StyledChip = styled.button`
  flex: 0 0 auto;
  background-color: #e5e4ff;
  padding: 0.75rem 1.25rem;
  font-family: 'Source Sans Pro', cursive;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 100%;
  color: #1c325d;
  border-radius: 1.75rem;
  margin: 0.5rem;
  height: 2.5rem;
  appearance: none;
  border: none;
  &:active,
  &:hover,
  &:focus {
    background-color: #cdcbff;
  }
`;

export default Chip;

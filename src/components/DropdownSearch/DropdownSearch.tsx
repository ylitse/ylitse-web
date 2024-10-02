import styled from 'styled-components';

import { DEFAULT_ICON_SIZE, palette } from '@/components/constants';
import { iconVariants } from '@/components/Buttons/variants';

export type InputType = 'number' | 'password' | 'text';

type TextInputProps = {
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  value: string;
};

export const DropdownSearch = ({
  onChange,
  // options,
  placeholder = '',
  value,
}: TextInputProps): JSX.Element => (
  <>
    <LeftIcon />
    <SearchInput
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      value={value}
    />
  </>
);

const SearchInput = styled.input`
  border: 1px solid ${palette.purple};
  border-radius: 20px;
  font-family: Source Sans Pro;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 0.5rem 60px;
`;

const LeftIcon = styled.div`
  background-image: ${iconVariants['search']};
  background-repeat: no-repeat;
  background-size: contain;
  height: ${DEFAULT_ICON_SIZE.SMALL}px;
  position: relative;
  transform: translate(${DEFAULT_ICON_SIZE.SMALL + 22}px);
  width: ${DEFAULT_ICON_SIZE.SMALL}px;
`;

export default DropdownSearch;

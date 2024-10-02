import styled from 'styled-components';
import { useState } from 'react';

import { DEFAULT_ICON_SIZE, palette } from '@/components/constants';
import { iconVariants } from '@/components/Buttons/variants';
import Text from '../Text';

export type InputType = 'number' | 'password' | 'text';

type TextInputProps = {
  addSkill: (value: string) => void;
  options: string[];
  placeholder?: string;
};

export const DropdownSearch = ({
  addSkill,
  options,
  placeholder = '',
}: TextInputProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setFilteredOptions(
      options.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    );
    setDropdownVisible(true);
  };

  const handleSkillClick = (option: string) => {
    setQuery('');
    setFilteredOptions(options);
    addSkill(option);
    setDropdownVisible(false);
  };

  const handleBlur = () => {
    // Delay dropdown hide to allow click event on options
    setTimeout(() => setDropdownVisible(false), 200);
  };

  return (
    <Container>
      <LeftIcon />
      <SearchInput
        type="text"
        value={query}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={() => setDropdownVisible(true)}
        placeholder={placeholder}
      />
      {isDropdownVisible && filteredOptions.length > 0 && (
        <Dropdown>
          {filteredOptions.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSkillClick(option)}>
              <Text>{option}</Text>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  border: 1px solid ${palette.purple};
  border-radius: 20px;
  font-family: Source Sans Pro;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 0.5rem 60px;
  width: 100%;
`;

const Dropdown = styled.div`
  background-color: white;
  border: 1px solid ${palette.purple};
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  left: 0;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: calc(100% + 5px);
  width: 100%;
  z-index: 10;
`;

const DropdownItem = styled.div`
  background-color: white;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background-color: ${palette.purpleHover};
  }
`;

const LeftIcon = styled.div`
  background-image: ${iconVariants['search']};
  background-repeat: no-repeat;
  background-size: contain;
  height: ${DEFAULT_ICON_SIZE.SMALL}px;
  left: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${DEFAULT_ICON_SIZE.SMALL}px;
`;

export default DropdownSearch;

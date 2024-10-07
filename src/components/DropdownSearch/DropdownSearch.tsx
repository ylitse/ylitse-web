import styled from 'styled-components';
import { useState } from 'react';

import { palette } from '@/components/constants';
import SearchBar from '../SearchBar';
import Text from '../Text';

type Props = {
  isDisabled: boolean;
  options: string[];
  placeholder: string;
  selectOption: (option: string) => void;
};

export const DropdownSearch = ({
  isDisabled,
  options,
  placeholder,
  selectOption,
}: Props): JSX.Element => {
  const [query, setQuery] = useState('');
  const [notChosenOptions, setNotChosenOptions] = useState(options);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  console.log('filtered options', filteredOptions);

  const handleQueryChange = (query: string) => {
    setQuery(query);
    setIsDropdownVisible(true);
    if (query.length > 0) {
      setFilteredOptions(
        notChosenOptions.filter(option =>
          option.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    } else {
      setFilteredOptions(options);
    }
  };

  const handleOptionClick = (option: string) => {
    setQuery('');
    const notChosen = notChosenOptions.filter(o => o !== option);
    setNotChosenOptions(notChosen);
    setFilteredOptions(notChosen);
    setIsDropdownVisible(false);
    selectOption(option);
  };

  // Delay dropdown hide to allow click event on options
  const handleBlur = () => setTimeout(() => setIsDropdownVisible(false), 200);
  const handleFocus = () => setIsDropdownVisible(true);

  const isDropdownOpen = isDropdownVisible && filteredOptions.length > 0;

  return (
    <Container>
      <SearchBar
        isDisabled={isDisabled}
        hasOpenDropdown={isDropdownOpen}
        onBlur={handleBlur}
        onChange={handleQueryChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        value={query}
        variant="small"
      />
      {isDropdownOpen && (
        <Dropdown>
          {filteredOptions.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleOptionClick(option)}>
              <Text variant="menuOption">{option}</Text>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 1rem 0;
  max-width: 350px;
  position: relative;
`;

const Dropdown = styled.div`
  background-color: white;
  border: 1px solid ${palette.purple};
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  max-height: 200px;
  outline: ${palette.purple} solid 2px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  z-index: 10;
`;

const DropdownItem = styled.div`
  cursor: pointer;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: ${palette.blueLight};
  }
`;

export default DropdownSearch;

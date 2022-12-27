import React from 'react';
import {
  selectSearchString,
  selectSelectedSkills,
} from '../mentorsFilterSlice';
import { useAppSelector } from '../../../../store';

import styled from 'styled-components';
import { palette } from '../../../../components/variables';
import { Text } from '../../../../components/Text/Text';
import SearchIcon from '../../../../static/icons/search.svg';

type Props = {
  onFiltersClose: () => void;
};

export const FiltersButton: React.FC<Props> = ({ onFiltersClose }) => {
  const selectedSkills = useAppSelector(selectSelectedSkills);
  const searchString = useAppSelector(selectSearchString);
  const isFiltersApplied = selectedSkills.length > 0 || searchString.length > 0;

  const skillsSelectedString = selectedSkills.length
    ? `${selectedSkills.length} aihetta valittu`
    : '';

  const searchAppliedString =
    searchString.length > 0 ? `"${searchString}"` : '';

  const twoFiltersDelimiter =
    searchString.length > 0 && selectedSkills.length > 0 ? ' & ' : '';

  return (
    <SearchButton
      aria-label="show-filters"
      onClick={onFiltersClose}
      isFiltersApplied={isFiltersApplied}
    >
      <img src={SearchIcon} />
      <Text color={isFiltersApplied ? 'white' : 'purple'}>
        {isFiltersApplied
          ? `${searchAppliedString}${twoFiltersDelimiter}${skillsSelectedString}`
          : `Suodata mentoreita`}
      </Text>
    </SearchButton>
  );
};

const SearchButton = styled.button<{ isFiltersApplied: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  right: 1rem;
  border: none;
  background-color: ${({ isFiltersApplied }) =>
    isFiltersApplied ? palette.darkpurple : palette.whiteblue};

  border-radius: 16px;
  height: 3rem;
  padding: 0.6rem;
  box-shadow: 0.1rem 0.1rem ${palette.blurbackground};

  &:hover {
    opacity: 0.7;
  }
`;

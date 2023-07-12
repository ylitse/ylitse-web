import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { palette } from '@/components/variables';
import TextInput from '@/components/TextInput';

const searchInputIconSize = 24;
const closeInputIconSize = 34;

type Props = {
  hideSearch: () => void;
};

const Search = ({ hideSearch }: Props) => {
  const { t } = useTranslation('chat');
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchBar>
      <SearchInput
        variant="iconInput"
        color={searchValue ? 'blueDark' : 'greyFaded'}
        leftIcon={{
          sizeInPx: searchInputIconSize,
          variant: 'search',
        }}
        rightButton={{
          onClick: hideSearch,
          sizeInPx: closeInputIconSize,
          variant: 'closeWithBackground',
        }}
        onChange={setSearchValue}
        placeholder={t('header.search')}
        value={searchValue}
      />
    </SearchBar>
  );
};

const SearchBar = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-left: -${searchInputIconSize}px;
  margin-right: -${closeInputIconSize}px;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  max-width: 400px;
  &:focus {
    outline: 1px solid ${palette.purple};
  }
`;

export default Search;

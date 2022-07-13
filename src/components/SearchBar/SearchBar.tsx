import styled from 'styled-components';
import SearchIconImg from '../../static/img/search.svg';

/**
 * Search bar styles and layout
 */

type SearchProps = {
  placeholder: string;
};

// eslint-disable-next-line react/prop-types
const SearchBar: React.FC<SearchProps> = ({ placeholder }) => {
  return (
    <SearchBox>
      <SearchIcon />
      <SearchInput type="text" placeholder={placeholder}></SearchInput>
    </SearchBox>
  );
};

const SearchInput = styled.input`
  flex: 1;
  display: flex;
  border: #4a2acb solid 1px;
  width: 100%;
  font-family: 'Source Sans Pro', cursive;
  font-weight: 400;
  font-size: 1.5rem;
  padding: 1rem 4.5rem;
  border-radius: 1.75rem;
  box-sizing: border-box;
  &:focus {
    border: #4a2acb solid 2px;
    outline: none;
  }
`;

const SearchBox = styled.div`
  flex: 0 0 auto;
  width: 47%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SearchIcon = styled.div`
  background-image: url(${SearchIconImg});
  background-size: contain;
  background-repeat: no-repeat;
  height: 2rem;
  width: 2rem;
  flex: 0 0 auto;
  display: flex;
  position: absolute;
  left: 1.5rem;
`;

export default SearchBar;

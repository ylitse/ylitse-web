import styled from 'styled-components';
import SearchIconImg from '@/static/icons/search.svg';
import { palette } from '../variables';

type SearchProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

const SearchBar: React.FC<SearchProps> = ({ onChange, ...props }) => (
  <SearchBox>
    <SearchIcon />
    <SearchInput
      type="text"
      {...props}
      onChange={e => onChange(e.target.value)}
    ></SearchInput>
  </SearchBox>
);

const SearchInput = styled.input`
  border: ${palette.purple} solid 1px;
  border-radius: 1.75rem;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  font-family: 'Source Sans Pro';
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 400;
  padding: 1rem 4.5rem;
  width: 100%;
  &:focus {
    outline: ${palette.purple} solid 2px;
  }
`;

const SearchBox = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  position: relative;
  width: 47%;
`;

const SearchIcon = styled.div`
  background-image: url(${SearchIconImg});
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex: 0 0 auto;
  height: 2rem;
  left: 1.5rem;
  position: absolute;
  width: 2rem;
`;

export default SearchBar;

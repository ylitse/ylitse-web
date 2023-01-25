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
  flex: 1;
  display: flex;
  border: ${palette.purple} solid 1px;
  width: 100%;
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 1.1rem;
  padding: 1rem 4.5rem;
  border-radius: 1.75rem;
  box-sizing: border-box;
  &:focus {
    outline: ${palette.purple} solid 2px;
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

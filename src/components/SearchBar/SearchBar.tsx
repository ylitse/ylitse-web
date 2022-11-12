import styled from 'styled-components';
import SearchIconImg from '../../static/img/search.svg';
import { basicSourceSansText } from '../variables';
import * as cssVariables from '../variables';

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
  border: ${cssVariables.palette.purple} solid 1px;
  width: 100%;
  ${basicSourceSansText};
  font-weight: 400;
  font-size: 1.5rem;
  padding: 1rem 4.5rem;
  border-radius: 1.75rem;
  box-sizing: border-box;
  &:focus {
    outline: ${cssVariables.palette.purple} solid 2px;
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

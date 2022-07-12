import styled from 'styled-components';
import SearchIconImg from '@/static/img/search.svg';

export const MentorSearch = styled.input`
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

export const MentorSearchBox = styled.div`
  flex: 0 0 auto;
  width: 47%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const SearchIcon = styled.div`
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

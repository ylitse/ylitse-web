import styled from 'styled-components';
import SearchIcon from '@/static/img/search.svg'

export const StyledMentorSearch = styled.input`
  flex: 1;
	display: flex;
	border: #4A2ACB solid 1px;
	width: 100%;
	font-family: 'Source Sans Pro', cursive;
	font-weight: 400;
	font-size: 1.5rem;
	padding: 1rem 4.5rem;
	border-radius: 1.75rem;
	box-sizing: border-box;
	&:focus {
		border: #4A2ACB solid 2px;
		outline: none;
	}
`;

export const StyledMentorSearchBox = styled.div`
  flex: 0 0 auto;
	width: 47%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

export const StyledSearchIcon = styled.div`
	background-image: url(${SearchIcon});
	background-size: contain;
	background-repeat: no-repeat;
  height: 2rem;
	width: 2rem;
  flex: 0 0 auto;
	display: flex;
	position: absolute;
	left: 1.5rem;
`;
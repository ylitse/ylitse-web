import styled from 'styled-components';
import ExpandIcon from './icon-expand.svg';

export const StyledSkillContainer = styled.div`
  flex: 0 0 auto;
  width: 90%;
	height: 20rem;
  display: flex;
  flex-wrap: wrap;
  margin-top: 3rem;
	justify-content: center;
	position: relative;
`;

export const StyledSkill = styled.button`
	flex: 0 0 auto;
  background-color: #e5e4ff;
  padding: .75rem 1.25rem;
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 100%;
	color: #1c325d;
	border-radius: 1.75rem;
	margin: .5rem;
	height: 1.25rem;
	appearance: none;
`;

export const StyledMoreContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 3rem;
	position: absolute;
	width: fit-content;
	bottom: 3rem;
`;

export const StyledMoreIcon = styled.div`
	background-image: url(${ExpandIcon});
	background-size: contain;
	background-repeat: no-repeat;
  height: 2rem;
	width: 2rem;
  flex: 0 0 2rem;
	display: flex;
	position: absolute;
	left: -2rem;
`;

export const StyledShowMoreButton = styled.button`
font-family: 'Baloo 2';
font-style: normal;
font-weight: 700;
font-size: 18px;
`;

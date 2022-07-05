import styled from 'styled-components';

export const StyledMentorPage = styled.div `
	background-color: #CDE8F8;
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
`;

export const StyledMentorSearchElement = styled.div`
  flex: 0 0 auto;
	max-width: 76vw;
	background-color: white;
	border-radius: 10px;
	margin-left: 12vw;
	margin-right: 12vw;
	margin-top: calc(60px + 10vh);
	height: fit-content;
`;

export const StyledMentorHeader = styled.div`
  flex: 1;
	max-width: 76vw;
	background-color: #43BFFF;
	border-radius: 10px;
	max-height: 80px;
	height: 80px;
	color: #1C325D;
	font-family: "Baloo 2", cursive;
	font-weight: 700;
	font-size: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const StyledMentorInfoText = styled.div`
  flex: 0 0 auto;
	color: #1C325D;
	font-family: 'Source Sans Pro', cursive;
	font-weight: 400;
	font-size: 1.25rem;
	width: 47%;
	padding-right: 5%;
`;

export const StyledMentorSearchDiv = styled.div`
  flex: 1;
	display: flex;
	flex-wrap: wrap;
	padding: 2rem 0;
	width: 90%;
	max-width: 90%;
	margin: auto;
`;

export const StyledMentorCardContainer = styled.div`
	flex: 1;
`;
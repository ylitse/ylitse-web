import styled from 'styled-components';

export const MentorPageElement = styled.div`
  background-color: #cde8f8;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

export const MentorSearchElement = styled.div`
  flex: 0 0 auto;
  max-width: 76vw;
  background-color: white;
  border-radius: 10px;
  margin-left: 12vw;
  margin-right: 12vw;
  margin-top: calc(60px + 10vh);
  height: fit-content;
`;

export const MentorHeader = styled.div`
  flex: 1;
  max-width: 76vw;
  background-color: #43bfff;
  border-radius: 10px;
  max-height: 80px;
  height: 80px;
  color: #1c325d;
  font-family: 'Baloo 2', cursive;
  font-weight: 700;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MentorInfoText = styled.div`
  flex: 0 0 auto;
  color: #1c325d;
  font-family: 'Source Sans Pro', cursive;
  font-weight: 400;
  font-size: 1.25rem;
  width: 47%;
  padding-right: 5%;
`;

export const MentorSearchDiv = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 2rem 0;
  width: 90%;
  max-width: 90%;
  margin: auto;
`;

export const MentorCardContainer = styled.div`
  flex: 1;
`;

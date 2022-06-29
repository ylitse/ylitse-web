import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const StyledText = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&display=swap');
  font-family: 'Baloo 2', cursive;
  font-weight: 700;
  color: white;
  width: 100%;
  text-align: center;
`;

export const StyledLoader = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid rgba(255, 255, 255, 0.5);
  border-top: 10px solid white;
  border-radius: 50%;
  animation: ${rotate} 1.5s linear infinite;
`;

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(74, 54, 201, 0.87);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

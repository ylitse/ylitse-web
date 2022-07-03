import styled, { keyframes } from 'styled-components';
import background from './background.svg';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const StyledText = styled.h1`
  font-family: 'Baloo 2', cursive;
  font-weight: 700;
  color: white;
  width: 100%;
  text-align: center;
`;

export const StyledLoader = styled.div`
  width: 55px;
  height: 55px;
  border: 10px solid rgba(255, 255, 255, 0.5);
  border-top: 10px solid white;
  border-radius: 50%;
  animation: ${rotate} 1.5s linear infinite;
`;

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledLoadingPage = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  z-index: 10;
  background: linear-gradient(
      0deg,
      rgba(74, 54, 201, 0.87),
      rgba(74, 54, 201, 0.87)
    ),
    url(${background});
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
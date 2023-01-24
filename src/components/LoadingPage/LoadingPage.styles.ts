import styled, { keyframes } from 'styled-components';

import Background from '@/static/img/loading-background.svg';
import Text from '@/components/Text';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingText = styled(Text)`
  color: white;
  width: 100%;
  text-align: center;
`;

export const Loader = styled.div`
  width: 55px;
  height: 55px;
  border: 10px solid rgba(255, 255, 255, 0.5);
  border-top: 10px solid white;
  border-radius: 50%;
  animation: ${rotate} 1.5s linear infinite;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const Page = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  z-index: 10;
  background: linear-gradient(
      0deg,
      rgba(74, 54, 201, 0.87),
      rgba(74, 54, 201, 0.87)
    ),
    url(${Background});
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

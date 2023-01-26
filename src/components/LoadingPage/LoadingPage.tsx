import styled, { keyframes } from 'styled-components';

import Background from '@/static/img/loading-background.svg';

import Text from '@/components/Text';

const LoadingPage = () => {
  return (
    <Page>
      <Wrapper>
        <Loader />
        <LoadingText variant="bold" color="white">
          Ladataan Ylitse MentorApp -palvelua
        </LoadingText>
      </Wrapper>
    </Page>
  );
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Page = styled.div`
  align-items: center;
  background: linear-gradient(
      0deg,
      rgba(74, 54, 201, 0.87),
      rgba(74, 54, 201, 0.87)
    ),
    url(${Background});
  background-position: center;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  z-index: 10;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Loader = styled.div`
  animation: ${rotate} 1.5s linear infinite;
  border: 10px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border-top: 10px solid white;
  height: 55px;
  width: 55px;
`;

const LoadingText = styled(Text)`
  text-align: center;
  width: 100%;
`;

export default LoadingPage;

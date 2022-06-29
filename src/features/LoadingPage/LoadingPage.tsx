import { StyledContainer, StyledLoader, StyledText } from './LoadingPage.styles';

const LoadingPage = () => {
  return (
    <StyledContainer>
      <StyledLoader />
      <StyledText>Ladataan Ylitse MentorApp -palvelua</StyledText>
    </StyledContainer>
  );
};

export default LoadingPage;

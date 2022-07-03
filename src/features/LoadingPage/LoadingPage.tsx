import {
  StyledLoadingPage,
  StyledLoader,
  StyledText,
  StyledWrapper,
} from './LoadingPage.styles';

const LoadingPage = () => {
  return (
    <StyledLoadingPage>
      <StyledWrapper>
        <StyledLoader />
        <StyledText>Ladataan Ylitse MentorApp -palvelua</StyledText>
      </StyledWrapper>
    </StyledLoadingPage>
  );
};

export default LoadingPage;

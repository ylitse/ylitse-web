import { Page, Loader, LoadingText, Wrapper } from './LoadingPage.styles';

const LoadingPage = () => {
  return (
    <Page>
      <Wrapper>
        <Loader />
        <LoadingText variant="bold">
          Ladataan Ylitse MentorApp -palvelua
        </LoadingText>
      </Wrapper>
    </Page>
  );
};

export default LoadingPage;

import { Page, Loader, Text, Wrapper } from './LoadingPage.styles';

const LoadingPage = () => {
  return (
    <Page>
      <Wrapper>
        <Loader />
        <Text>Ladataan Ylitse MentorApp -palvelua</Text>
      </Wrapper>
    </Page>
  );
};

export default LoadingPage;

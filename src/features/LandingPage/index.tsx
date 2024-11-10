import { Button } from '@/components/Buttons';
import PageWithTransition from '@/components/PageWithTransition';
import Text from '@/components/Text';
import styled from 'styled-components';

const LandingPage = () => {
  return (
    <PageWithTransition>
      <Container>
        <Text>Hello, World!</Text>
        <ButtonContainer>
          <Button
            sizeInPx={4}
            text={{
              color: 'purple',
              text: 'Login',
              variant: 'boldBaloo',
            }}
            onClick={() => console.log('sup')}
          />
          <Button
            sizeInPx={4}
            text={{
              color: 'purple',
              text: 'Register',
              variant: 'boldBaloo',
            }}
            onClick={() => console.log('sup')}
          />
        </ButtonContainer>
      </Container>
    </PageWithTransition>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export default LandingPage;

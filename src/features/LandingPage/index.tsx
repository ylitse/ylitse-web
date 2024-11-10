import { Button } from '@/components/Buttons';
import PageWithTransition from '@/components/PageWithTransition';
import Background from '@/static/img/home-page-background.svg';
import Text from '@/components/Text';
import { palette } from '@/components/constants';
import styled from 'styled-components';
import Footer from '@/components/Footer';

const LandingPage = () => {
  return (
    <PageWithTransition>
      <MainContainer>
        <TopContent>
          <YlitseCard>
            <Text>
              Kohtaa ihmisia, jotka ovat olleet samassa tilanteessa. He tietavat
              mista puhut.
            </Text>
            <ButtonContainer>
              <a href="/login/">login</a>
              <a href="/register/">register</a>
            </ButtonContainer>
          </YlitseCard>
          <BgTron />
        </TopContent>
        <MiddleContent>Middle content</MiddleContent>
        <BottomContent>Bottom content</BottomContent>
      </MainContainer>
      <Footer />
    </PageWithTransition>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const TopContent = styled.div`
  display: flex;
  gap: 4px;
  flex: 1;
`;

const YlitseCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: ${palette.blue2};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const BgTron = styled.div`
  width: 100%;
  background-image: url(${Background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 40rem;
  position: relative;
`;

const MiddleContent = styled.div`
  background-color: ${palette.blueWhite};
  height: 100px;
  width: 100%;
  flex: 1;
`;

const BottomContent = styled.div`
  background-color: ${palette.blue2};
  height: 100px;
  width: 100%;
  flex: 1;
`;

export default LandingPage;

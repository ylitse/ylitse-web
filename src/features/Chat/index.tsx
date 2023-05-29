import { useMobileMode } from '@/hooks/useMobileMode';

import styled, { css } from 'styled-components';
import {
  breakpoints,
  CONTENT_HEIGHT,
  CONTENT_WIDTH,
  OUTER_VERTICAL_MARGIN,
} from '@/components/variables';
import Menu from './components/Menu';
import Window from './components/Window';
import PageWithTransition from '@/components/PageWithTransition';

const Chat = () => {
  const isMobile = useMobileMode();

  return (
    <PageWithTransition>
      <PageContainer isMobile={isMobile}>
        <Container>
          <Menu />
          <Window />
        </Container>
      </PageContainer>
    </PageWithTransition>
  );
};

const PageContainer = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    isMobile
      ? css`
          width: 100vw;
        `
      : css`
          display: flex;
          flex-direction: column;
          margin: ${OUTER_VERTICAL_MARGIN} auto;
          max-width: ${CONTENT_WIDTH};
          width: ${CONTENT_WIDTH};
        `}
  @media screen and (max-width: ${breakpoints.mobile}) {
    flex: 1;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 22px;
  height: ${CONTENT_HEIGHT};
  justify-content: center;
  min-height: 400px;
`;

export default Chat;

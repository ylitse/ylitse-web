import { useMobileMode } from '@/hooks/useMobileMode';
import { selectActiveChat } from './chatSlice';
import { useAppSelector } from '@/store';

import styled, { css } from 'styled-components';
import {
  breakpoints,
  CONTENT_HEIGHT,
  CONTENT_WIDTH,
  OUTER_VERTICAL_MARGIN,
} from '@/components/variables';
import ActiveWindow from './components/ActiveWindow';
import Menu from './components/Menu';
import PageWithTransition from '@/components/PageWithTransition';
import WelcomeWindow from './components/WelcomeWindow';

const Chat = () => {
  const isMobile = useMobileMode();
  const chat = useAppSelector(selectActiveChat);

  return (
    <PageWithTransition>
      <PageContainer isMobile={isMobile}>
        <InnerContainer>
          <Menu />
          {chat ? <ActiveWindow /> : <WelcomeWindow />}
        </InnerContainer>
      </PageContainer>
    </PageWithTransition>
  );
};

const PageContainer = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    isMobile &&
    css`
      display: flex;
      flex-direction: column;
      margin: ${OUTER_VERTICAL_MARGIN} auto;
      max-width: ${CONTENT_WIDTH};
    `}
  width: ${({ isMobile }) => (isMobile ? '100vw' : `${CONTENT_WIDTH}`)};
  @media screen and (max-width: ${breakpoints.mobile}) {
    flex: 1;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  gap: 22px;
  height: ${CONTENT_HEIGHT};
  justify-content: center;
  min-height: 400px;
`;

export default Chat;

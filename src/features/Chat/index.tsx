import { useTabletMode } from '@/hooks/useTabletMode';
import { selectActiveChat } from './chatSlice';
import { useAppSelector } from '@/store';

import styled, { css } from 'styled-components';
import { CHAT_GAP_WIDTH } from '@/features/Chat/constants';
import { CONTENT_WIDTH, OUTER_VERTICAL_MARGIN } from '@/components/variables';
import ActiveWindow from './components/ActiveWindow';
import WelcomeWindow from './components/WelcomeWindow';
import Menu from './components/Menu';
import PageWithTransition from '@/components/PageWithTransition';

const Chat = () => {
  const isTablet = useTabletMode();
  const chat = useAppSelector(selectActiveChat);

  return (
    <PageWithTransition>
      <PageContainer isTablet={isTablet}>
        <Menu />
        {!isTablet && <> {chat ? <ActiveWindow /> : <WelcomeWindow />}</>}
      </PageContainer>
    </PageWithTransition>
  );
};

const PageContainer = styled.div<{ isTablet: boolean }>`
  ${({ isTablet }) =>
    isTablet
      ? css``
      : css`
          display: flex;
          gap: ${CHAT_GAP_WIDTH};
          justify-content: center;
          margin: ${OUTER_VERTICAL_MARGIN} auto;
          max-width: ${CONTENT_WIDTH};
          width: ${CONTENT_WIDTH};
        `}
`;

export default Chat;

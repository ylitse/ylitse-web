import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import { spacing } from '@/components/variables';
import PageWithTransition from '@/components/PageWithTransition';
import Spinner from '@/components/Spinner';
import ChatMenu from './ChatMenu';
import ChatWindow from './ChatWindow';
import { useMobileMode } from '@/hooks/useMobileMode';

const ChatPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMobileMode();

  return (
    <PageWithTransition>
      {isLoading ? (
        <Spinner variant="large" />
      ) : isMobile ? (
        <>MOBIILI-CHAT</>
      ) : (
        <ChatContainer isMobile={isMobile}>
          <ChatMenu />
          <ChatWindow />
        </ChatContainer>
      )}
    </PageWithTransition>
  );
};

const ChatContainer = styled.div<{ isMobile: boolean }>`
  flex: 1;
  display: flex;
  ${({ isMobile }) =>
    isMobile
      ? css`
          scroll-snap-type: x mandatory;
          overflow: auto;
          white-space: nowrap;
          gap: 1.5rem;
          &::-webkit-scrollbar {
            display: none;
          }
        `
      : css`
          flex-wrap: wrap;
          justify-content: stretch;
          height: auto;
          margin: ${spacing.layout_outer_spacing} ${spacing.layout_spacing};
        `}

  @media screen and (max-width: 1500px) {
    width: calc(1130px + (${spacing.layout_spacing} * 2));
    max-width: 100vw;
  }
`;

export default ChatPage;

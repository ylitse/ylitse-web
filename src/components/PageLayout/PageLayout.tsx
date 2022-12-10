import styled from 'styled-components';
import React from 'react';
import * as cssVariables from '../variables';
import { useMobileMode } from '@/hooks/useMobileMode';

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const isMobile = useMobileMode();

  return (
    <BasicPageElement>
      {isMobile ? (
        children
      ) : (
        <PageContent isMobile={isMobile}>{children}</PageContent>
      )}
    </BasicPageElement>
  );
};

const BasicPageElement = styled.div`
  background-color: ${cssVariables.palette.lightblue};
  position: relative;
  width: 100vw;
  height: auto;
  min-height: calc(100vh - 60px - 3.5rem);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

const PageContent = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) => isMobile && `flex: 1;`}
  max-width: 76vw;
  height: auto;
  margin: auto;
  margin-top: ${cssVariables.spacing.layout_outer_spacing};
  margin-bottom: ${cssVariables.spacing.layout_outer_spacing};
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1500px) {
    width: 1130px;
    max-width: calc(100vw - (${cssVariables.spacing.layout_spacing} * 2));
  }
`;

export default PageLayout;

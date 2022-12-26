import styled from 'styled-components';
import React from 'react';
import { breakpoints, spacing, palette } from '../variables';
import { useMobileMode } from '@/hooks/useMobileMode';

type Props = {
  children: React.ReactNode;
};

const PageLayout: React.FC<Props> = ({ children }) => {
  const isMobile = useMobileMode();

  return (
    <BasicPageElement>
      {isMobile ? children : <PageContent>{children}</PageContent>}
    </BasicPageElement>
  );
};

const BasicPageElement = styled.div`
  background-color: ${palette.lightblue};
  position: relative;
  width: 100vw;
  height: auto;
  min-height: calc(100vh - 60px - 3.5rem);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

const PageContent = styled.div`
  max-width: 76vw;
  height: auto;
  margin: auto;
  margin-top: ${spacing.layout_outer_spacing};
  margin-bottom: ${spacing.layout_outer_spacing};
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1500px) {
    width: 1130px;
    max-width: calc(100vw - (${spacing.layout_spacing} * 2));
  }

  @media screen and (max-width: ${breakpoints.mobile}) {
    flex: 1;
  }
`;

export default PageLayout;

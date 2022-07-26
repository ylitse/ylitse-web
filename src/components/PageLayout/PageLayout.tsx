import styled from 'styled-components';
import React from 'react';

/**
 * Basic page layout that gives margins for any containers created to page
 */

type PageLayoutProps = {
  children: React.ReactNode;
};

// eslint-disable-next-line react/prop-types
const PageLayout: React.FC<PageLayoutProps> = ({
  children,
}) => {
  return (
    <BasicPageElement>
      <PageContent>{children}</PageContent>
    </BasicPageElement>
  );
};

const BasicPageElement = styled.div`
  background-color: #cde8f8;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

const PageContent = styled.div`
  background-color: transparent;
  position: relative;
  width: 80vw;
  height: calc(100vh - 60px - 3.5rem - 20vw);
  top: 10vw;
  left: 10vw;
  display: flex;
  flex-direction: column;
`;

export default PageLayout;

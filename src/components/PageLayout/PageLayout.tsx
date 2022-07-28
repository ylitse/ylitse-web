import styled from 'styled-components';
import React from 'react';

/**
 * Basic page layout that gives margins for any containers created to page
 */

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <BasicPageElement>
      <PageContent>{children}</PageContent>
    </BasicPageElement>
  );
};

const BasicPageElement = styled.div`
  background-color: #cde8f8;
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
  background-color: transparent;
  position: relative;
  width: 80vw;
  height: auto;
  margin: auto;
<<<<<<< HEAD
  margin-top: 10vw;
=======
  margin-top: 3.75rem;
  margin-bottom: 3.75rem;
>>>>>>> 04828d4 (Mentor cards list on mentor page started. Card header layout finished)
  display: flex;
  flex-direction: column;
`;

export default PageLayout;

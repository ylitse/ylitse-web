import styled from 'styled-components';
import React from 'react';

/** Layout for one container on page, like on mentor page */

type OneContainerProps = {
  headLine: string;
  children: React.ReactNode;
};

// eslint-disable-next-line react/prop-types
const OneContainerLayout: React.FC<OneContainerProps> = ({
  headLine,
  children,
}) => {
  return (
    <OneContainer>
      <PageHeader>{headLine}</PageHeader>
      {children}
    </OneContainer>
  );
};

const OneContainer = styled.div`
  flex: 0 0 auto;
  width: 100%;
  border-radius: 10px;
  margin: 0;
  height: auto;
	background-color: white;
`;

const PageHeader = styled.div`
  flex: 1;
  background-color: #43bfff;
  border-radius: 10px;
  max-height: 80px;
  height: 80px;
  color: #1c325d;
  font-family: 'Baloo 2', cursive;
  font-weight: 700;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default OneContainerLayout;

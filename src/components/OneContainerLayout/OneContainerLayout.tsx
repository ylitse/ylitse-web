import styled from 'styled-components';
import React from 'react';
import * as cssVariables from '../variables';
import { Text } from '../Text/Text';

type OneContainerProps = {
  headLine: string;
  children: React.ReactNode;
};

const OneContainerLayout: React.FC<OneContainerProps> = ({
  headLine,
  children,
}) => {
  return (
    <OneContainer>
      <PageHeader>
        <Text variant="h1">{headLine}</Text>
      </PageHeader>
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
  background-color: ${cssVariables.palette.white};
`;

const PageHeader = styled.div`
  flex: 1;
  background-color: ${cssVariables.palette.blue2};
  border-radius: 10px;
  max-height: 80px;
  height: 80px;
  color: ${cssVariables.palette.darkblue};
  ${cssVariables.basicBalooText};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default OneContainerLayout;

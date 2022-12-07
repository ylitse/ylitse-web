import styled from 'styled-components';
import React from 'react';
import * as cssVariables from '../../../../components/variables';
import { Text } from '../../../../components/Text/Text';
import { FiltersButton } from './FiltersButton';

type Props = {
  headLine: string;
  children: React.ReactNode;
  onFiltersClose: () => void;
  isFiltersVisible: boolean;
};

const Filters: React.FC<Props> = ({
  headLine,
  onFiltersClose,
  isFiltersVisible,
  children,
}) => {
  return (
    <Container>
      <PageHeader>
        <Text variant="h1">{headLine}</Text>
        {!isFiltersVisible && <FiltersButton onFiltersClose={onFiltersClose} />}
      </PageHeader>
      {children}
    </Container>
  );
};

const Container = styled.div`
  flex: 0 0 auto;
  width: 100%;
  border-radius: 10px;
  margin: 0;
  height: auto;
  background-color: ${cssVariables.palette.white};
`;

const PageHeader = styled.div`
  background-color: ${cssVariables.palette.blue2};
  border-radius: 10px;
  max-height: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Filters;

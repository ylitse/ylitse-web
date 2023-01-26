import styled from 'styled-components';
import React from 'react';
import { palette } from '@/components/variables';
import { Text } from '@/components/Text/Text';
import { FiltersButton } from './FiltersButton';
import { useMobileMode } from '@/hooks/useMobileMode';
import { useTranslation } from 'react-i18next';

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
  const isMobile = useMobileMode();
  const { t } = useTranslation('mentors');

  return isMobile ? (
    <MobileContainer>
      <MobileHeader variant="h1">{headLine}</MobileHeader>
      <Text>{t('filters.description')}</Text>
    </MobileContainer>
  ) : (
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
  background-color: ${palette.white};
  border-radius: 10px;
  flex: 0 0 auto;
  height: auto;
  margin: 0;
  position: relative;
  width: 100%;
`;

const PageHeader = styled.div`
  align-items: center;
  background-color: ${palette.blue};
  border-radius: 10px;
  display: flex;
  height: 80px;
  justify-content: center;
  max-height: 80px;
`;

const MobileContainer = styled.div`
  align-items: center;
  background-color: ${palette.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
`;

const MobileHeader = styled(Text)`
  align-self: flex-start;
`;

export default Filters;

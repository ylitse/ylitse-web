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
  const { t } = useTranslation();

  return isMobile ? (
    <MobileContainer>
      <MobileHeader variant="h1">{headLine}</MobileHeader>
      <Text variant="p">{t('mentorPage.filters.description')}</Text>
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
  flex: 0 0 auto;
  width: 100%;
  border-radius: 10px;
  margin: 0;
  height: auto;
  position: relative;
`;

const PageHeader = styled.div`
  background-color: ${palette.blue2};
  border-radius: 10px;
  max-height: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileContainer = styled.div`
  background-color: ${palette.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
`;

const MobileHeader = styled(Text)`
  align-self: flex-start;
`;

export default Filters;

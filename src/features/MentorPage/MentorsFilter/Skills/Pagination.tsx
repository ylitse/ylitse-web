import styled from 'styled-components';
import { usePagination } from './usePagination';
import { useAppDispatch } from '@/store';
import { useTranslation } from 'react-i18next';

import { PageButton } from './PageButton';
import { Text } from '@/components/Text/Text';
import TextButton from '@/components/Buttons/TextButton';
import { resetFilters } from '../mentorsFilterSlice';

type Props = {
  skillTotalAmount: number;
  currentPage: number;
  setCurrentPage: (next: number) => void;
  onFiltersClose: () => void;
};

export const SKILL_AMOUNT_ON_PAGE = 15;

export const Pagination = ({
  skillTotalAmount,
  setCurrentPage,
  currentPage,
  onFiltersClose,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize: SKILL_AMOUNT_ON_PAGE,
    totalCount: skillTotalAmount,
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation('mentors');

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <Container>
      <TextButton
        aria-label="close-filters"
        variant="light"
        onClick={handleReset}
      >
        <ButtonText>{t('filters.clear')}</ButtonText>
      </TextButton>
      <PaginationContainer>
        {paginationRange?.map((page, index) => (
          <PageButton
            key={`${page}_${index}`}
            isSelected={currentPage === page}
            page={page}
            onClick={() => setCurrentPage(Number(page))}
          />
        ))}
      </PaginationContainer>
      <TextButton
        aria-label="close-filters"
        variant="light"
        onClick={onFiltersClose}
      >
        <ButtonText>{t('filters.close')}</ButtonText>
      </TextButton>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-top: 2rem;
  width: 100%;
`;

const PaginationContainer = styled.div`
  display: flex;
  width: fit-content;
`;

const ButtonText = styled(Text)`
  margin: 0;
  padding: 0;
  &:hover {
    opacity: 0.7;
  }
`;

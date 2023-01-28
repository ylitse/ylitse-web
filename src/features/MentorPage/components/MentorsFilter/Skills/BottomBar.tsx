import { resetFilters } from '../../../mentorsFilterSlice';
import { useAppDispatch } from '@/store';

import { usePagination } from './usePagination';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { PageButton } from './PageButton';
import { IconButton } from '@/components/Buttons';
import { PageSizeDropdown } from './PageDropdown';

type Props = {
  skillTotalAmount: number;
  currentPage: number;
  setCurrentPage: (next: number) => void;
};

export const SKILL_AMOUNT_ON_PAGE = 15;

export const BottomBar = ({
  skillTotalAmount,
  setCurrentPage,
  currentPage,
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
      <IconButton
        variant="deleteOutlined"
        onClick={handleReset}
        sizeInPx={20}
        text={{
          color: 'redDark',
          text: t('filters.clear'),
          variant: 'bold',
        }}
      />
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
      <PageSizeDropdown />
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
  width: 100%;
`;

const PaginationContainer = styled.div`
  display: flex;
  width: fit-content;
`;

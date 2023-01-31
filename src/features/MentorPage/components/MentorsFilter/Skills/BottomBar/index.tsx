import { resetFilters } from '@/features/MentorPage/mentorsFilterSlice';
import { useAppDispatch } from '@/store';

import { usePagination } from './usePagination';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { PageButton } from './PageButton';
import { IconButton } from '@/components/Buttons';
import PageSizeDropdown from './PageSizeDropdown';

type Props = {
  skillTotalAmount: number;
  currentPage: number;
  setCurrentPage: (next: number) => void;
  skillsInPage: number;
  setSkillsInPage: (next: number) => void;
};

export const BottomBar = ({
  skillTotalAmount,
  setCurrentPage,
  currentPage,
  skillsInPage,
  setSkillsInPage,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize: skillsInPage,
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
        <Next
          variant="next"
          sizeInPx={28}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === paginationRange?.slice(1)[0]}
        />
      </PaginationContainer>

      <PageSizeDropdown
        skillsInPage={skillsInPage}
        setSkillsInPage={setSkillsInPage}
      />
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding-top: 2.5rem;
  width: 100%;
`;

const PaginationContainer = styled.div`
  display: flex;
  width: fit-content;
`;

const Next = styled(IconButton)`
  margin-left: 0.5rem;
`;

export default BottomBar;

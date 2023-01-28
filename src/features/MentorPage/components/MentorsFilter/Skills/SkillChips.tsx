import { useMemo, useState } from 'react';

import { selectSelectedSkills, toggleSkill } from '../../../mentorsFilterSlice';
import { useAppDispatch, useAppSelector } from '@/store';

import { usePillShakeChecker } from './usePillShakeChecker';

import styled from 'styled-components';
import { Chip } from '@/components/Chip';
import { Pagination, SKILL_AMOUNT_ON_PAGE } from './Pagination';

type Props = { skills: Array<string>; onFiltersClose: () => void };
export const SkillChips = ({ skills, onFiltersClose }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const selectedSkills = useAppSelector(selectSelectedSkills);
  const { existingSelected: shouldNotAnimate, syncExisting } =
    usePillShakeChecker(selectedSkills);

  const dispatch = useAppDispatch();

  const handleSkillToggle = (skill: string) => {
    dispatch(toggleSkill(skill));
    syncExisting(skill);
  };

  const pageSkills = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * SKILL_AMOUNT_ON_PAGE;
    const lastPageIndex = firstPageIndex + SKILL_AMOUNT_ON_PAGE;
    const pageSkills = skills.slice(firstPageIndex, lastPageIndex);
    return selectedSkills.concat(
      pageSkills.filter(s => !selectedSkills.includes(s)),
    );
  }, [currentPage, selectedSkills]);

  return (
    <Container>
      <Skills>
        {pageSkills.map(skill => {
          const isSelected = selectedSkills.some(
            selected => selected === skill,
          );
          const shouldShakeAnimate = isSelected && !shouldNotAnimate[skill];
          return (
            <Chip
              key={skill}
              text={skill}
              isSelected={isSelected}
              shouldShake={shouldShakeAnimate}
              onToggle={handleSkillToggle}
            />
          );
        })}
      </Skills>
      <Pagination
        skillTotalAmount={skills.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onFiltersClose={onFiltersClose}
      />
    </Container>
  );
};

const Skills = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  height: '11rem';
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  height: fit-content;
  justify-content: center;
  margin-top: 0;
  overflow: hidden;
  padding-bottom: 6rem;
  padding-left: 10%;
  padding-right: 10%;
  position: relative;
  width: 80%;
`;

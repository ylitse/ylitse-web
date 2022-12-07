import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Chip } from '../../../../components/Chip';
import { Pagination, SKILL_AMOUNT_ON_PAGE } from './Pagination';
import { selectSelectedSkills, toggleSkill } from '../mentorsFilterSlice';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { usePillShakeChecker } from './usePillShakeChecker';

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
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  height: '11rem';
`;

const Container = styled.div`
  flex: 0 0 auto;
  padding-left: 10%;
  padding-right: 10%;
  height: fit-content;
  width: 80%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  margin-top: 0;
  justify-content: center;
  position: relative;
  padding-bottom: 6rem;
`;

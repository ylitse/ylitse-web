import { useMemo, useState } from 'react';

import { selectSelectedSkills, toggleSkill } from '../../../mentorsFilterSlice';
import { useAppDispatch, useAppSelector } from '@/store';

import { usePillShakeChecker } from './usePillShakeChecker';

import styled from 'styled-components';
import { Chip } from '@/components/Chip';
import { BottomBar, SKILL_AMOUNT_ON_PAGE } from './BottomBar';

type Props = { skills: Array<string> };

const SkillChips = ({ skills }: Props) => {
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
      <BottomBar
        skillTotalAmount={skills.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

const Skills = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  height: fit-content;
  justify-content: center;
  overflow: hidden;
  padding-left: 10%;
  padding-right: 10%;
`;

export default SkillChips;

import { useMemo, useState } from 'react';

import { selectSelectedSkills, toggleSkill } from '../../../mentorsFilterSlice';
import { useAppDispatch, useAppSelector } from '@/store';

import { usePillShakeChecker } from './usePillShakeChecker';

import { defaultPageSize } from './PageSizeDropdown/const';

import styled from 'styled-components';
import { Chip } from '@/components/Chip';
import { BottomBar } from './BottomBar';

type Props = { skills: Array<string> };

const SkillChips = ({ skills }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [skillsInPage, setSkillsInPage] = useState(defaultPageSize);
  const selectedSkills = useAppSelector(selectSelectedSkills);
  const { existingSelected: shouldNotAnimate, syncExisting } =
    usePillShakeChecker(selectedSkills);

  const dispatch = useAppDispatch();

  const handleSkillToggle = (skill: string) => {
    dispatch(toggleSkill(skill));
    syncExisting(skill);
  };

  const pageSkills = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * skillsInPage;
    const lastPageIndex = firstPageIndex + skillsInPage;
    const pageSkills = skills.slice(firstPageIndex, lastPageIndex);
    return selectedSkills.concat(
      pageSkills.filter(s => !selectedSkills.includes(s)),
    );
  }, [currentPage, selectedSkills, skillsInPage]);

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
        skillsInPage={skillsInPage}
        setSkillsInPage={setSkillsInPage}
      />
    </Container>
  );
};

const Skills = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 1rem;
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
  padding-left: 6%;
  padding-right: 6%;
`;

export default SkillChips;

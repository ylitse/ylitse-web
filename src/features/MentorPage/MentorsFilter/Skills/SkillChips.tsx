import React from 'react';
import styled from 'styled-components';
import { Chip } from '../../../../components/Chip';
import ShowMoreChips from './ShowMoreChips';
import { selectSelectedSkills, toggleSkill } from '../mentorsFilterSlice';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { usePillShakeChecker } from './usePillShakeChecker';

export const SkillChips = ({ skills }: { skills: Array<string> }) => {
  const [shouldShowAllSkills, setShowAllSkills] = React.useState(false);
  const selectedSkills = useAppSelector(selectSelectedSkills);
  const { existingSelected: shouldNotAnimate, syncExisting } =
    usePillShakeChecker(selectedSkills);

  const dispatch = useAppDispatch();

  const handleSkillToggle = (skill: string) => {
    dispatch(toggleSkill(skill));
    syncExisting(skill);
  };

  const handleShowMoreSkillsChange = () =>
    setShowAllSkills(!shouldShowAllSkills);

  return (
    <Container>
      <Skills isSelected={shouldShowAllSkills}>
        {skills.map(skill => {
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
      <ShowMoreChips
        shouldShowAllSkills={shouldShowAllSkills}
        setShouldShowAllSkills={handleShowMoreSkillsChange}
      />
    </Container>
  );
};

const Skills = styled.div<{ isSelected: boolean }>`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  height: ${props => (props.isSelected ? `fit-content` : '11rem')};
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

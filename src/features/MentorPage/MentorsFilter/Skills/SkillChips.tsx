import React from 'react';
import styled from 'styled-components';
import { Chip } from '../../../../components/Chip';
import ShowMoreChips from './ShowMoreChips';
import { selectSelectedSkills, toggleSkill } from '../mentorsFilterSlice';
import { useAppDispatch, useAppSelector } from '../../../../store';
import useIsFirstRender from '../../../../hooks/useIsFirstRender';

export const SkillChips = ({ skills }: { skills: Array<string> }) => {
  const [shouldShowAllSkills, setShowAllSkills] = React.useState(false);
  const selectedSkills = useAppSelector(selectSelectedSkills);
  const [existingSelected, setExistingSelected] = React.useState<
    Record<string, boolean>
  >({});

  const isFirstRender = useIsFirstRender();

  const dispatch = useAppDispatch();

  const handleSkillToggle = (skill: string) => {
    dispatch(toggleSkill(skill));

    if (existingSelected[skill]) {
      setExistingSelected({ ...existingSelected, [skill]: false });
    }
  };

  const handleShowMoreSkillsChange = () =>
    setShowAllSkills(!shouldShowAllSkills);

  React.useEffect(() => {
    const existingSelected = selectedSkills.reduce(
      (selected, skill) => ({ ...selected, [skill]: true }),
      {},
    );
    setExistingSelected(existingSelected);
  }, []);

  return (
    <Container>
      <Skills isSelected={shouldShowAllSkills}>
        {skills.map(skill => {
          const isSelected = selectedSkills.some(
            selected => selected === skill,
          );
          const shouldShakeAnimate =
            isSelected && !isFirstRender && !existingSelected[skill];
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

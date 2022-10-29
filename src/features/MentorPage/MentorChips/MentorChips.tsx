import styled from 'styled-components';
import { Chip } from '../../../components/Chip';
import ShowMoreChips from './ShowMoreChips';
import React from 'react';

/**
 * Logic to show skill chips. Array of skill names is
 * mapped and passed to Chip one by on, where styles and layout
 * will be added.
 */

const MentorSkillChips = ({ skills }: { skills: Array<string> }) => {
  const [shouldShowAllSkills, setShowAllSkills] = React.useState(false);

  const handleShowMoreSkillsChange = () =>
    setShowAllSkills(!shouldShowAllSkills);

  return (
    <ChipContainer>
      <SkillChips isSelected={shouldShowAllSkills}>
        {skills.map(skill => (
          <Chip key={skill} text={skill} />
        ))}
      </SkillChips>
      <ShowMoreChips
        shouldShowAllSkills={shouldShowAllSkills}
        setShouldShowAllSkills={handleShowMoreSkillsChange}
      />
    </ChipContainer>
  );
};

const SkillChips = styled.div<{ isSelected: boolean }>`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  height: ${props => (props.isSelected ? `fit-content` : '11rem')};
`;

const ChipContainer = styled.div`
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

export default MentorSkillChips;

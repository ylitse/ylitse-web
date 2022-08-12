import styled from 'styled-components';
import { Chip } from '../../../components/Chip';
import ShowMoreChips from './ShowMoreChips';
import React from 'react';

/**
 * Logic to show skill chips. Array of skill names is
 * mapped and passed to Chip one by on, where styles and layout
 * will be added.
 */

const MentorSkillChips = ({ items }: { items: Array<string> }) => {
  const [shouldShowAllSkills, setShowAllSkills] = React.useState(false);

  const handleShowMoreSkillsChange = () =>
    setShowAllSkills(!shouldShowAllSkills);

  //change the first letter of every skill to uppercase, then alphabetize
  const upperCaseSkills = items.map(item => ({
    text: `${item.charAt(0).toUpperCase()}${item.slice(1)}`,
  }));
  const sortedSkills = [...upperCaseSkills].sort((a, b) =>
    a.text.localeCompare(b.text),
  );

  return (
    <ChipContainer>
      <SkillChips isSelected={shouldShowAllSkills}>
        {sortedSkills.map(item => (
          <Chip key={item.text} text={item.text} />
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

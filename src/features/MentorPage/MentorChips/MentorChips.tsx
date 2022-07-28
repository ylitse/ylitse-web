import { ChipProps } from '../../../components/Chip/types';
import styled from 'styled-components';
import Chip from '../../../components/Chip';
import ShowMoreChips from './ShowMoreChips';
import React from 'react';

/**
 * Logic to show skill chips. Array of SkillPillItems
 * should be passed to SkillPill, where styles and layout
 * will be added. Should call MentorCards when chips are
 * selected?
 */

const MentorSkillChips = ({ items }: { items: Array<ChipProps> }) => {
  const [shouldShowAllSkills, setShowAllSkills] = React.useState(false);

  const handleShowMoreSkillsChange = () =>
    setShowAllSkills(!shouldShowAllSkills);

  //change the first letter of every skill to uppercase, then alphabetize
  items.map(item => {
    item.text = item.text.charAt(0).toUpperCase() + item.text.slice(1);
  });
  items.sort((a, b) => a.text.localeCompare(b.text));

  const showAllClass = shouldShowAllSkills ? 'show-more' : 'show-less';

  return (
    <ChipContainer>
      <SkillChips className={showAllClass}>
        {items.map(item => (
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

const SkillChips = styled.div`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  &.show-more {
    height: fit-content;
  }
  &.show-less {
    height: 10.5rem;
  }
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
  margin-top: 3rem;
  justify-content: center;
  position: relative;
  padding-bottom: 6rem;
`;

export default MentorSkillChips;
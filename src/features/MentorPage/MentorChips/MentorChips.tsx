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
  //change the first letter of every skill to uppercase, then alphabetize
  items.map(item => {
    item.text = item.text.charAt(0).toUpperCase() + item.text.slice(1);
  });
  items.sort((a, b) => a.text.localeCompare(b.text));

  return (
    <ChipContainer>
      <SkillChips id="skill-chips">
        {items.map(item => (
          <Chip key={item.text} text={item.text} />
        ))}
      </SkillChips>
      <ShowMoreChips />
    </ChipContainer>
  );
};

const SkillChips = styled.div`
  flex: 0 0 auto;
  height: 10.5rem;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  &.show-more {
    height: fit-content;
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

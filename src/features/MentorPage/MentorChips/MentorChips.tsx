import { ChipProps } from '../../../components/Chip/types';
import styled from 'styled-components';
import Chip from '../../../components/Chip';
import ShowMoreChips from './ShowMoreChips';

/**
 * Logic to show skill chips. Array of SkillPillItems
 * should be passed to SkillPill, where styles and layout
 * will be added. Should call MentorCards when chips are
 * selected?
 */

const mentorChipList: Array<ChipProps> = [
  {
    text: 'Ahdistus',
  },
  {
    text: 'Avioliitto',
  },
  {
    text: 'Alkoholismi',
  },
];

const MentorSkillChips = () => {
  return (
    <ChipContainer>
      {mentorChipList.map(item => (
        // eslint-disable-next-line react/jsx-key
        <Chip key={item.text} text={item.text} />
      ))}
      <ShowMoreChips />
    </ChipContainer>
  );
};

const ChipContainer = styled.div`
  flex: 0 0 auto;
  padding-left: 10%;
  padding-right: 10%;
  height: 20rem;
  display: flex;
  flex-wrap: wrap;
  margin-top: 3rem;
  justify-content: center;
  position: relative;
`;

export default MentorSkillChips;

import styled from 'styled-components';
import ListCard from '../ListCard';
import { MentorListItemsProps } from './types';
import * as cssVariables from '../../../components/variables';

/**
 * Mentor cards listing on mentor page
 */

const MentorListItems = ({
  setVisibleCard,
  mentorCardData,
}: MentorListItemsProps) => {
  return (
    <CardsList data-testid="mentor-cards-container">
      {mentorCardData.map(item => (
        <ListCard
          key={item.mentor.displayName}
          mentorCardData={item}
          setVisibleCard={setVisibleCard}
        />
      ))}
    </CardsList>
  );
};

const CardsList = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
  height: auto;
  width: calc(76vw + (${cssVariables.spacing.layout_spacing} * 2));
  margin-top: ${cssVariables.spacing.layout_spacing};
  margin-left: calc(${cssVariables.spacing.layout_spacing} * -1);
  @media screen and (max-width: 1500px) {
    width: calc(1130px + (${cssVariables.spacing.layout_spacing} * 2));
    max-width: 100vw;
  }
`;

export default MentorListItems;

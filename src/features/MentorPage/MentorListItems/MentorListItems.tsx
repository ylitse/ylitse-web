import styled from 'styled-components';
import ListCard from '../ListCard';
import { MentorListItemsProps } from './types';
import * as cssVariables from '../../../components/variables';

/**
 * The logic for mentor cards shown in the Mentor page
 * An array with cards that need to be shown should be
 * passed to CardsElement where layout will be added.
 */

const MentorListItems = ({
  setVisibleCard,
  mentordata,
}: MentorListItemsProps) => {
  return (
    <CardsList data-testid="mentor-cards-container">
      {mentordata.map(item => (
        // eslint-disable-next-line react/jsx-key
        <ListCard
          key={item.mentor.displayName}
          mentordata={item}
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

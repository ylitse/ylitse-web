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
  width: calc(100% + 3.8rem);
  margin-top: calc(${cssVariables.spacing.layout_spacing} / 2);
  margin-left: -1.9rem;
`;

export default MentorListItems;

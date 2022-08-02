import styled from 'styled-components';
import ListCard from '../ListCard';
import { MentorListItemsProps } from './types';

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
  justify-content: space-between;
  height: auto;
  width: 100%;
  margin-top: 3.75rem;
`;

export default MentorListItems;

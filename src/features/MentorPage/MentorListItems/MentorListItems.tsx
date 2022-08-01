import styled from 'styled-components';
import ListCard from '../../../components/ListCard';
import { ListCardProps, MentorProps } from '@/components/ListCard/types';

/**
 * The logic for mentor cards shown in the Mentor page
 * An array with cards that need to be shown should be
 * passed to CardsElement where layout will be added.
 */

const CreateListCard = ({ item }: { item: MentorProps }) => {
  const cardProps: ListCardProps = {
    mentor: item,
    isLoggedIn: Math.random() < 0.5 ? true : false,
    isNewMentor: Math.random() < 0.5 ? true : false,
    contactMessage:
      Math.random() < 0.5 ? 'Olen tavoitettavissa joka päivä 16-18' : '',
  };
  return cardProps;
};

const MentorListItems = ({ listitems }: { listitems: Array<MentorProps> }) => {
  return (
    <CardsList data-testid="mentor-cards-container">
      {listitems.map(item => (
        // eslint-disable-next-line react/jsx-key
        <ListCard
          key={item.displayName}
          mentordata={CreateListCard({ item })}
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

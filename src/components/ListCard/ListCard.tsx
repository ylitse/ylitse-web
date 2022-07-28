import styled from 'styled-components';
import { ListCardProps } from './types';
import ListCardHeader from './ListCardHeader';

/**
 * Div to hold mentor cards. Needs a parameter added
 * That hold the info for cards that need to be showed.
 */

const ListCard = ({ mentordata }: { mentordata: ListCardProps }) => {
  console.log(mentordata);
  const age = new Date().getFullYear() - mentordata.mentor.birthYear;
  console.log(age);
  return (
    <ListCardElement>
      <ListCardHeader
        name={mentordata.mentor.displayName}
        age={age}
        region={mentordata.mentor.region}
        availability={mentordata.isLoggedIn}
        message={mentordata.contactMessage}
      />
    </ListCardElement>
  );
};

const ListCardElement = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-wrap: wrap;
  height: 30vh;
  width: 24vw;
  background-color: white;
  border-radius: 0.75rem;
`;

export default ListCard;

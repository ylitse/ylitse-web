import styled from 'styled-components';
import { ListCardProps } from './types';
import ListCardHeader from './ListCardHeader';
import ListCardLanguages from './ListCardLanguages';
import ListCardSkills from './ListCardSkills';
import ListCardStory from './ListCardStory';
import OpenCardButton from './OpenCardButton';

/**
 * Div to hold mentor cards. Needs a parameter added
 * That hold the info for cards that need to be showed.
 */

type Props = {
  setVisibleCard: (mentorCardData: ListCardProps) => void;
  mentordata: ListCardProps;
};

const ListCard = ({ setVisibleCard, mentordata }: Props) => {
  const age = new Date().getFullYear() - mentordata.mentor.birthYear;
  return (
    <ListCardElement>
      <ListCardHeader
        name={mentordata.mentor.displayName}
        age={age}
        region={mentordata.mentor.region}
        available={mentordata.isLoggedIn}
        newMentor={mentordata.isNewMentor}
        message={mentordata.contactMessage}
      />
      <CardContent>
        <ListCardStory story={mentordata.mentor.story} />
        <ListCardLanguages languages={mentordata.mentor.languages} />
        <ListCardSkills skills={mentordata.mentor.skills} />
        <OpenCardButton
          setVisibleCard={setVisibleCard}
          mentordata={mentordata}
        />
      </CardContent>
    </ListCardElement>
  );
};

const ListCardElement = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  width: 24vw;
  background-color: white;
  border-radius: 0.75rem;
  flex-direction: column;
`;

const CardContent = styled.div`
  flex: 1;
  padding: 1.9rem;
`;

export default ListCard;

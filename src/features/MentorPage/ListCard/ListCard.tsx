import styled from 'styled-components';
import { ListCardProps } from './types';
import ListCardHeader from './ListCardHeader';
import ListCardLanguages from './ListCardLanguages';
import ListCardSkills from './ListCardSkills';
import ListCardStory from './ListCardStory';
import OpenCardButton from './OpenCardButton';
import * as cssVariables from '../../../components/variables';

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
  flex: 0 0 30%;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  background-color: white;
  border-radius: 0.75rem;
  flex-direction: column;
  margin: ${cssVariables.spacing.layout_spacing};
  max-width: calc(
    ((76vw + ${cssVariables.spacing.layout_spacing} * 2) / 3) -
      (${cssVariables.spacing.layout_spacing} * 2)
  );
  @media screen and (min-width: 2100px) {
    flex: 0 0 25%;
    max-width: calc(
      ((76vw + ${cssVariables.spacing.layout_spacing} * 2) / 4) -
        (${cssVariables.spacing.layout_spacing} * 2)
    );
  }
  @media screen and (min-width: 2550px) {
    flex: 0 0 20%;
    max-width: calc(
      ((76vw + ${cssVariables.spacing.layout_spacing} * 2) / 5) -
        (${cssVariables.spacing.layout_spacing} * 2)
    );
  }
  @media screen and (max-width: 1500px) {
    flex: 0 0 30%;
    max-width: calc(
      ((1130px + (${cssVariables.spacing.layout_spacing} * 2)) / 3) -
        (${cssVariables.spacing.layout_spacing} * 2)
    );
  }
  @media screen and (max-width: 1186px) {
    max-width: calc((100vw / 3) - (${cssVariables.spacing.layout_spacing} * 2));
  }
  @media screen and (max-width: 900px) {
    flex: 0 0 50%;
    max-width: calc((100vw / 2) - (${cssVariables.spacing.layout_spacing} * 2));
  }
`;

const CardContent = styled.div`
  flex: 1;
  padding: 1.9rem;
`;

export default ListCard;

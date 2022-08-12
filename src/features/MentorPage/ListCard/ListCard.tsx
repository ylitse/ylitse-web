import styled from 'styled-components';
import ListCardHeader from './ListCardHeader';
import ListCardLanguages from './ListCardLanguages';
import ListCardSkills from './ListCardSkills';
import ListCardStory from './ListCardStory';
import OpenCardButton from './OpenCardButton';
import * as cssVariables from '../../../components/variables';
import { handleSetVisibleCardProps } from '../MentorPage';
import { Mentor } from '../mentorPageApi';

/**
 * A single card with mentor info on mentor page card listing
 */

type Props = {
  setVisibleCard: ({
    shouldShowMentorCard,
    mentorCardData,
  }: handleSetVisibleCardProps) => void;
  mentorCardData: Mentor;
};

const ListCard = ({ setVisibleCard, mentorCardData }: Props) => {
  if (mentorCardData !== undefined) {
    return (
      <ListCardElement>
        <ListCardHeader
          name={mentorCardData.name}
          age={mentorCardData.age}
          region={mentorCardData.region}
          isAvailable={mentorCardData.is_vacationing}
          isNewMentor={false}
          message={mentorCardData.status_message}
        />
        <CardContent>
          <ListCardStory story={mentorCardData.story} />
          <ListCardLanguages languages={mentorCardData.languages} />
          <ListCardSkills skills={mentorCardData.skills} />
          <OpenCardButton
            setVisibleCard={setVisibleCard}
            mentorCardData={mentorCardData}
          />
        </CardContent>
      </ListCardElement>
    );
  }
  return <></>;
};

const ListCardElement = styled.div`
  flex: 0 0 30%;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  background-color: ${cssVariables.palette.white};
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

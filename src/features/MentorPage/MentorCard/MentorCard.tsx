import styled from 'styled-components';
import { ListCardProps } from '../../../../../mentor_card/src/features/MentorPage/ListCard/types';
import { handleSetVisibleCardProps } from '../MentorPage';

/**
 * The logic for mentor cards shown in the Mentor page
 * An array with cards that need to be shown should be
 * passed to CardsElement where layout will be added.
 */

type Props = {
  setVisibleCard: ({
    shouldShowMentorCard,
    mentorCardData,
  }: handleSetVisibleCardProps) => void;
  mentorCardData: ListCardProps;
};

const MentorCard = ({ setVisibleCard, mentorCardData }: Props) => {
  console.log(mentorCardData);
  console.log(setVisibleCard);

  const handleClick = () => {
    const shouldShowMentorCard = false;
    setVisibleCard({ shouldShowMentorCard, mentorCardData });
  };

  if (mentorCardData) {
    return (
      <StyledMentorCard className="mentorikortti">
        Mentorikortti
        {mentorCardData.mentor.displayName}
        isLoggedIn {mentorCardData.isLoggedIn}
        isNewMentor {mentorCardData.isNewMentor}
        {mentorCardData.mentor.story}
        <CloseButton onClick={handleClick}>sulje</CloseButton>
      </StyledMentorCard>
    );
  } else {
    return <></>;
  }
};

const CloseButton = styled.button``;

const StyledMentorCard = styled.div`
  position: sticky;
  width: 80vw;
  height: 80vh;
  background-color: white;
  z-index: 100;
`;

export default MentorCard;

//<MentorCard setVisibleCard={setVisibleCard} mentordata={shouldShowMentorCard}/>

//	const handleClick = () => {
//	setVisibleCard(mentordata);
//};

//

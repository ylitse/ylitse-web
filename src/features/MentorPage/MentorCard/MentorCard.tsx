import styled from 'styled-components';
import { ListCardProps } from '../../../../../mentor_card/src/features/MentorPage/ListCard/types';
import { handleSetVisibleCardProps } from '../MentorPage';
import MentorCardHeader from './MentorCardHeader';
import CloseIcon from '../../../static/icons/icon-close.svg';
import MentorContent from './MentorContent';

/**
 * Selected mentor card in mentor page
 */

type Props = {
  setVisibleCard: ({
    shouldShowMentorCard,
    mentorCardData,
  }: handleSetVisibleCardProps) => void;
  mentorCardData: ListCardProps;
};

const MentorCard = ({ setVisibleCard, mentorCardData }: Props) => {
  const handleClick = () => {
    const shouldShowMentorCard = false;
    setVisibleCard({ shouldShowMentorCard, mentorCardData });
  };

  if (mentorCardData) {
    return (
      <MentorCardContainer>
        <StyledMentorCard className="mentorikortti">
          <MentorCardHeader mentorCardData={mentorCardData} />
          <CloseButton onClick={handleClick}></CloseButton>
          <MentorContent mentorCardData={mentorCardData} />
        </StyledMentorCard>
      </MentorCardContainer>
    );
  } else {
    return <></>;
  }
};

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-image: url(${CloseIcon});
  background-size: contain;
  background-repeat: no-repeat;
  height: 2rem;
  width: 2rem;
  background-color: transparent;
  border: none;
  appearance: none;
  z-index: 10;
`;

const StyledMentorCard = styled.div`
  position: fixed;
  display: flex;
  top: 21.5vh;
  left: 17.5vw;
  width: 65vw;
  min-height: 57vh;
  height: fit-content;
  background-color: white;
  opacity: 1;
  border-radius: 10px;
  z-index: 100;
`;

const MentorCardContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(57, 57, 57, 0.75);
  z-index: 10;
`;

export default MentorCard;

import styled from 'styled-components';
import { ListCardProps } from '../../../../../mentor_card/src/features/MentorPage/ListCard/types';
import { handleSetVisibleCardProps } from '../MentorPage';
import MentorCardHeader from './MentorCardHeader';
import MentorContent from './MentorContent';
import { IconButton } from '../../../components/Buttons';

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
  if (mentorCardData !== undefined) {
    const handleClick = () => {
      setVisibleCard({
        shouldShowMentorCard: false,
        mentorCardData: undefined,
      });
    };
    return (
      <MentorCardContainer>
        <StyledMentorCard>
          <MentorCardHeader mentorCardData={mentorCardData} />
          <IconButton variant="close" onClick={handleClick}></IconButton>
          <MentorContent mentorCardData={mentorCardData} />
        </StyledMentorCard>
      </MentorCardContainer>
    );
  }
  return <></>;
};

const StyledMentorCard = styled.div`
  position: fixed;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 65vw;
  min-height: 57vh;
  height: fit-content;
  max-height: 80vh;
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

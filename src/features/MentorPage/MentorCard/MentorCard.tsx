import styled from 'styled-components';
import MentorCardHeader from './MentorCardHeader';
import MentorContent from './MentorContent';
import { IconButton } from '../../../components/Buttons';
import * as cssVariables from '../../../components/variables';
import { Mentor } from '../mentorPageApi';

/**
 * Selected mentor card in mentor page
 */

type Props = {
  onDismiss: () => void;
  mentor: Mentor;
};

const MentorCard = ({ mentor, onDismiss }: Props) => {
  return (
    <MentorCardContainer>
      <StyledMentorCard>
        <MentorCardHeader mentor={mentor} />
        <IconButton variant="close" onClick={onDismiss}></IconButton>
        <MentorContent mentor={mentor} />
      </StyledMentorCard>
    </MentorCardContainer>
  );
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
  background-color: ${cssVariables.palette.white};
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
  background-color: ${cssVariables.palette.blurbackground};
  z-index: 10;
`;

export default MentorCard;

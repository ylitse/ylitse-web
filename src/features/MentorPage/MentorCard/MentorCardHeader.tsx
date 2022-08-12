import styled from 'styled-components';
import { ListCardProps } from '../ListCard/types';
import ProfilePicPlaceholder from '../../../static/img/icon-chat-profilepic.svg';
import * as cssVariables from '../../../components/variables';
import MentorCardHeaderBasicInfo from './MentorCardHeaderBasicInfo';
import { Mentor } from '../mentorPageApi';

type Props = {
  mentorCardData: Mentor;
};

const MentorCardHeader = ({ mentorCardData }: Props) => {
  //const newCardMessage = mentorCardData.isNewMentor ? 'Uusi' : '';
  const newCardMessage = '';
  const availabilityMessage = mentorCardData.is_vacationing
    ? 'Ei tavoitettavissa'
    : newCardMessage;
  return (
    <MentorCardHeaderContainer isLoggedIn={mentorCardData.isLoggedIn}>
      <MentorAvailability
        isShowing={availabilityMessage != ''}
        isNew={availabilityMessage === 'Uusi'}
      >
        {availabilityMessage}
      </MentorAvailability>
      <ProfilePicContainer />
      <MentorCardHeaderBasicInfo mentorCardData={mentorCardData} />
    </MentorCardHeaderContainer>
  );
};

const MentorCardHeaderContainer = styled.div<{ isLoggedIn: boolean }>`
  flex: 0 0 21vw;
  min-height: 57vh;
  width: 21vw;
  border-radius: 10px;
  position: relative;
  top: 0;
  left: 0;
  background-color: ${props =>
    props.isLoggedIn
      ? cssVariables.palette.purple
      : cssVariables.palette.bluegrey};
`;

const ProfilePicContainer = styled.div`
  background-image: url(${ProfilePicPlaceholder});
  width: 10vw;
  height: 10vw;
  background-size: contain;
  background-repeat: no-repeat;
  flex: 0 0 10vw;
  position: relative;
  top: 3vw;
  left: 50%;
  transform: translateX(-50%);
`;

const MentorAvailability = styled.div<{ isShowing: boolean; isNew: boolean }>`
  display: ${props => (props.isShowing ? `flex` : `none`)};
  background-color: ${props =>
    props.isNew ? cssVariables.palette.orange : cssVariables.palette.whiteblue};
  color: ${cssVariables.palette.darkblue};
  position: absolute;
  top: 0;
  left: 50%;
  ${cssVariables.basicSourceSansText};
  font-weight: 600;
  font-size: 1rem;
  line-height: 150%;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  transform: translate(-50%, -50%);
  width: fit-content;
`;

export default MentorCardHeader;

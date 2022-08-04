import styled from 'styled-components';
import { ListCardProps } from '../../../../../mentor_card/src/features/MentorPage/ListCard/types';
import ProfilePicPlaceholder from '../../../static/img/icon-chat-profilepic.svg';
import * as cssVariables from '../../../components/CommonTextStyles/variables';
import MentorCardHeaderBasicInfo from './MentorCardHeaderBasicInfo';

/**
 * Header of the mentor card
 */

type Props = {
  mentorCardData: ListCardProps;
};

const MentorCardHeader = ({ mentorCardData }: Props) => {
  const newCardMessage = mentorCardData.isNewMentor ? 'Uusi' : '';
  const availabilityMessage = mentorCardData.isLoggedIn
    ? newCardMessage
    : 'Ei tavoitettavissa';
  return (
    <MentorCardHeaderContainer>
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

const MentorCardHeaderContainer = styled.div`
  flex: 0 0 21vw;
  min-height: 57vh;
  height: 100%;
  width: 21vw;
  border-radius: 10px;
  position: relative;
  top: 0;
  left: 0;
  background-color: ${cssVariables.palette.purple};
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
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 150%;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  transform: translate(-50%, -50%);
`;

export default MentorCardHeader;

import styled from 'styled-components';
import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';
import { breakpoints, palette } from '@/components/variables';
import { BasicInfo } from './BasicInfo';
import { Mentor } from '@/features/MentorPage/mentorPageApi';
import { useMobileMode } from '@/hooks/useMobileMode';
import Text from '@/components/Text';

type Props = {
  mentor: Mentor;
};

export const Header = ({ mentor }: Props) => {
  const availabilityMessage = mentor.isVacationing ? 'Ei tavoitettavissa' : '';
  const isMobile = useMobileMode();

  return isMobile ? (
    <Container isLoggedIn={!mentor.isVacationing}>
      <HeaderWrapper>
        <AvatarWrapper>
          <Availability
            variant="pSpan"
            isShowing={availabilityMessage.length > 0}
          >
            {availabilityMessage}
          </Availability>
          <ProfilePicture isMobile />
        </AvatarWrapper>
        <BasicInfo mentor={mentor} />
      </HeaderWrapper>
    </Container>
  ) : (
    <Container isLoggedIn={!mentor.isVacationing}>
      <Availability variant="pSpan" isShowing={availabilityMessage.length > 0}>
        {availabilityMessage}
      </Availability>
      <ProfilePicture isMobile={false} />
      <BasicInfo mentor={mentor} />
    </Container>
  );
};

const Container = styled.div<{ isLoggedIn: boolean }>`
  flex: 0 0 21vw;
  border-radius: 10px;
  background-color: ${props =>
    props.isLoggedIn ? palette.purple : palette.bluegrey};
`;

const ProfilePicture = styled.div<{ isMobile: boolean }>`
  background-image: url(${ProfilePicPlaceholder});
  background-size: contain;
  background-repeat: no-repeat;
  width: 10vw;
  height: 10vw;
  flex: 0 0 10vw;
  margin: 2rem auto;

  @media screen and (max-width: ${breakpoints.mobile}) {
    width: 20vw;
    height: 20vw;
    margin: 2rem 1rem;
    flex: 1;
  }
`;

const Availability = styled(Text)<{ isShowing: boolean }>`
  display: ${props => (props.isShowing ? `flex` : `none`)};
  background-color: ${palette.whiteblue};
  color: ${palette.darkblue};
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  width: fit-content;
          margin: -1rem auto;

  @media screen and (max-width: ${breakpoints.mobile}) {
margin -1rem 1rem;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

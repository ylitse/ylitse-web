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
            variant="label"
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
      <Availability variant="label" isShowing={availabilityMessage.length > 0}>
        {availabilityMessage}
      </Availability>
      <ProfilePicture isMobile={false} />
      <BasicInfo mentor={mentor} />
    </Container>
  );
};

const Container = styled.div<{ isLoggedIn: boolean }>`
  background-color: ${props =>
    props.isLoggedIn ? palette.purple : palette.greyBluish};
  border-radius: 10px;
  flex: 0 0 21vw;
`;

const ProfilePicture = styled.div<{ isMobile: boolean }>`
  background-image: url(${ProfilePicPlaceholder});
  background-repeat: no-repeat;
  background-size: contain;
  flex: 0 0 10vw;
  height: 10vw;
  margin: 2rem auto;
  width: 10vw;

  @media screen and (max-width: ${breakpoints.mobile}) {
    width: 20vw;
    height: 20vw;
    margin: 2rem 1rem;
    flex: 1;
  }
`;

const Availability = styled(Text)<{ isShowing: boolean }>`
  display: ${props => (props.isShowing ? `flex` : `none`)};
  background-color: ${palette.whiteBluish};
  color: ${palette.blueDark};
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

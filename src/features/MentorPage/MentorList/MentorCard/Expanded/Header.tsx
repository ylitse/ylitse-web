import styled, { css } from 'styled-components';
import ProfilePicPlaceholder from '../../../../../static/img/icon-chat-profilepic.svg';
import * as cssVariables from '../../../../../components/variables';
import { BasicInfo } from './BasicInfo';
import { Mentor } from '../../../mentorPageApi';
import { useMobileMode } from '@/hooks/useMobileMode';

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
          <Availability isShowing={availabilityMessage.length > 0} isMobile>
            {availabilityMessage}
          </Availability>
          <ProfilePicture isMobile />
        </AvatarWrapper>
        <BasicInfo mentor={mentor} />
      </HeaderWrapper>
    </Container>
  ) : (
    <Container isLoggedIn={!mentor.isVacationing}>
      <Availability isShowing={availabilityMessage.length > 0} isMobile={false}>
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
    props.isLoggedIn
      ? cssVariables.palette.purple
      : cssVariables.palette.bluegrey};
`;

const ProfilePicture = styled.div<{ isMobile: boolean }>`
  background-image: url(${ProfilePicPlaceholder});
  background-size: contain;
  background-repeat: no-repeat;

  ${({ isMobile }) =>
    isMobile
      ? css`
          width: 20vw;
          height: 20vw;
          margin: 2rem 1rem;
        `
      : css`
          width: 10vw;
          height: 10vw;
          flex: 0 0 10vw;
          margin: 2rem auto;
        `}
`;

const Availability = styled.div<{ isShowing: boolean; isMobile: boolean }>`
  display: ${props => (props.isShowing ? `flex` : `none`)};
  background-color: ${cssVariables.palette.whiteblue};
  color: ${cssVariables.palette.darkblue};
  ${cssVariables.basicSourceSansText};
  font-weight: 600;
  font-size: 1rem;
  line-height: 150%;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  width: fit-content;
  ${({ isMobile }) =>
    isMobile
      ? css`margin -1rem 1rem;`
      : css`
          margin: -1rem auto;
        `}
`;

const HeaderWrapper = styled.div`
  display: flex;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

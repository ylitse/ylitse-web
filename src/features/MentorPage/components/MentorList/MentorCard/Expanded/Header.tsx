import type { Mentor } from '@/features/MentorPage/mentorPageApi';

import { getStatus } from '@/utils/utils';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';
import ProfilePicPlaceholderForMe from '@/static/icons/chat-profilepic-me.svg';
import { breakpoints, palette } from '@/components/variables';
import { IconButton } from '@/components/Buttons';
import { BasicInfo } from './BasicInfo';
import { Tag } from './Tag';
import styled, { css } from 'styled-components';

type Props = {
  mentor: Mentor;
  isMe: boolean;
  isAvailable: boolean;
  isNew: boolean;
  onDismiss: () => void;
};

export const Header = ({
  mentor,
  isMe,
  isAvailable,
  isNew,
  onDismiss,
}: Props) => {
  const { isMobile } = useGetLayoutMode();

  const status = getStatus(isMe, isAvailable, isNew);

  const statusColors = {
    me: palette.blue,
    unavailable: palette.blueGrey,
    new: palette.purple,
    empty: palette.purple,
  };

  return isMobile ? (
    <Container statusColor={statusColors[status]} isMobile>
      <HeaderWrapper>
        <AvatarWrapper>
          <Tag status={status} />
          <ProfilePicture isMe={isMe} isMobile />
        </AvatarWrapper>
        <BasicInfo isMe={isMe} mentor={mentor} />
        <CloseButton
          onClick={onDismiss}
          variant="closeWithBackground"
          sizeInPx={38}
        />
      </HeaderWrapper>
    </Container>
  ) : (
    <Container statusColor={statusColors[status]} isMobile={false}>
      <Tag status={status} />
      <ProfilePicture isMe={isMe} isMobile={false} />
      <BasicInfo isMe={isMe} mentor={mentor} />
    </Container>
  );
};

const Container = styled.div<{ statusColor: string; isMobile: boolean }>`
  background-color: ${({ statusColor }) => statusColor}};
  border-radius: 0.75rem;
  box-sizing: border-box;
  border-radius: 10px;
  display: ${({ isMobile }) => (isMobile ? 'flex' : '')}
  flex: 0 0 21vw;
  min-height: 7.5rem;
  ${({ isMobile }) => !isMobile && css`padding: 2rem;'`}
`;

const ProfilePicture = styled.div<{ isMe: boolean; isMobile: boolean }>`
  background-image: ${({ isMe }) =>
    `url(${isMe ? ProfilePicPlaceholderForMe : ProfilePicPlaceholder})`};
  background-repeat: no-repeat;
  background-size: contain;
  flex: 0 0 10vw;
  height: 10vw;
  margin: 2rem auto;
  width: 10vw;
  @media screen and (max-width: ${breakpoints.mobile}) {
    flex: 0 0 3rem;
    margin: 1rem 2rem;
    height: 3rem;
    width: 3rem;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled(IconButton)`
  align-self: flex-start;
  margin: 0.5rem;
`;

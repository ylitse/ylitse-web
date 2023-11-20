import {
  selectMentorById,
  useGetMentorsQuery,
} from '@/features/MentorPage/mentorPageApi';
import { useAppDispatch, useAppSelector } from '@/store';
import { useMobileMode } from '@/hooks/useMobileMode';
import { useTabletMode } from '@/hooks/useTabletMode';

import { clearActiveChat, type ChatBuddy } from '@/features/Chat/chatSlice';

import styled from 'styled-components';
import ArchivedIcon from '@/static/icons/archived-chats.svg';
import Buttons from './Buttons';
import BlockedIcon from '@/static/icons/blocked-chats.svg';
import { IconButton } from '@/components/Buttons';
import { CONTENT_WIDTH, palette } from '@/components/variables';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import {
  CHAT_GAP_WIDTH,
  CHAT_MENU_WIDTH,
  LARGE_ROW_HEIGHT,
  ROW_HEIGHT,
} from '@/features/Chat/constants';
import Text from '@/components/Text';

type Props = {
  chat: ChatBuddy;
};

const Header = ({ chat }: Props) => {
  const isMobile = useMobileMode();
  const isTablet = useTabletMode();

  const dispatch = useAppDispatch();
  // Clearing the active chat will return to the menu in tablet mode
  const returnToTabletMenu = () => dispatch(clearActiveChat());

  useGetMentorsQuery();

  const mentor = useAppSelector(selectMentorById(chat.buddyId));

  const icons = {
    ok: <ProfileIcon color="purpleDark" />,
    archived: <img src={ArchivedIcon} />,
    banned: <img src={BlockedIcon} />,
  };

  return (
    <Container mobile={isMobile} tablet={isTablet}>
      {isTablet && (
        <IconButton variant="back" sizeInPx={40} onClick={returnToTabletMenu} />
      )}
      <IconContainer>{icons[chat.status]}</IconContainer>
      <MentorName variant="h2">{mentor?.name}</MentorName>
      <MentorBio isMobile={isMobile} isTablet={isTablet} variant="p">
        {mentor?.statusMessage}
      </MentorBio>
      <ButtonsWrapper>
        <Buttons chat={chat} tabletMode={isTablet} />
      </ButtonsWrapper>
    </Container>
  );
};

const Container = styled.div<{ mobile: boolean; tablet: boolean }>`
  align-items: center;
  border-bottom: 1px solid ${palette.greyLight};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  height: ${({ tablet }) => (tablet ? LARGE_ROW_HEIGHT : ROW_HEIGHT)};
  justify-content: flex-start;
  padding: 14px 40px;
  width: ${({ mobile, tablet }) =>
    mobile
      ? '100vw'
      : tablet
      ? '100vw'
      : `calc(${CONTENT_WIDTH}-${CHAT_MENU_WIDTH}-${CHAT_GAP_WIDTH}})`};
`;

const IconContainer = styled.div`
  flex-shrink: 0;
`;

const MentorName = styled(Text)`
  margin: 0;
  max-width: calc(
    (
      ${CONTENT_WIDTH}-${CHAT_MENU_WIDTH}-${CHAT_GAP_WIDTH}-
        (2 * 40px + 49px + 20px + 2 * 30px + 500px + 30px)
    )
  );
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MentorBio = styled(Text)<{ isMobile?: boolean; isTablet?: boolean }>`
  margin: 0;
  max-width: ${({ isMobile, isTablet }) =>
    isMobile || isTablet
      ? 'calc(100vw - 2*40px - 49px - 3*40px - 200px - 4*30px - 20px - 100px)'
      : `calc((${CONTENT_WIDTH}-${CHAT_MENU_WIDTH}-${CHAT_GAP_WIDTH}-(2 * 40px + 49px + 20px + 2*30px + 500px))/2)`};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonsWrapper = styled.div`
  margin-left: auto;
`;

export default Header;

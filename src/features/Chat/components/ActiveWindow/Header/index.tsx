// Libraries
import styled from 'styled-components';

// Store and hooks
import { clearActiveChat, type ChatBuddy } from '@/features/Chat/chatSlice';
import {
  selectMentorById,
  useGetMentorsQuery,
} from '@/features/MentorPage/mentorPageApi';
import { useAppDispatch, useAppSelector } from '@/store';
import { useTabletMode } from '@/hooks/useTabletMode';

// Variables
import {
  CHAT_GAP_WIDTH,
  CHAT_MENU_WIDTH,
  HIGH_ROW_HEIGHT,
  ROW_HEIGHT,
} from '@/features/Chat/constants';
import { CONTENT_WIDTH, palette } from '@/components/variables';

// Components
import ArchivedIcon from '@/static/icons/archived-chats.svg';
import Buttons from './Buttons';
import BlockedIcon from '@/static/icons/blocked-chats.svg';
import { IconButton } from '@/components/Buttons';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import Text from '@/components/Text';

type Props = {
  chat: ChatBuddy;
};

const Header = ({ chat }: Props) => {
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
    <Container tablet={isTablet}>
      {isTablet && (
        <IconButton variant="back" sizeInPx={40} onClick={returnToTabletMenu} />
      )}
      <IconContainer>{icons[chat.status]}</IconContainer>
      <MentorName variant="h2">{mentor?.name}</MentorName>
      <MentorBio isTablet={isTablet} variant="p">
        {mentor?.statusMessage}
      </MentorBio>
      <ButtonsWrapper>
        <Buttons chat={chat} tabletMode={isTablet} />
      </ButtonsWrapper>
    </Container>
  );
};

const Container = styled.div<{ tablet: boolean }>`
  align-items: center;
  border-bottom: 1px solid ${palette.greyLight};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  height: ${({ tablet }) => (tablet ? HIGH_ROW_HEIGHT : ROW_HEIGHT)};
  justify-content: flex-start;
  padding: 14px 40px;
  width: ${({ tablet }) =>
    tablet
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

const MentorBio = styled(Text)<{ isTablet: boolean }>`
  margin: 0;
  max-width: ${({ isTablet }) =>
    isTablet
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

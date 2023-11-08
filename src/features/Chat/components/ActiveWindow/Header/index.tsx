import { useState } from 'react';

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
import { palette } from '@/components/variables';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import { LARGE_ROW_HEIGHT, ROW_HEIGHT } from '@/features/Chat/constants';
import Search from './Search';
import Text from '@/components/Text';

type Props = {
  chat: ChatBuddy;
};

const Header = ({ chat }: Props) => {
  const isMobile = useMobileMode();
  const isTablet = useTabletMode();
  const [isSearchShown, setIsSearchShown] = useState(false);
  const showSearch = () => setIsSearchShown(true);
  const hideSearch = () => setIsSearchShown(false);

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
    <Container isTablet={isTablet}>
      {isTablet && (
        <IconButton variant="back" sizeInPx={40} onClick={returnToTabletMenu} />
      )}
      {mentor && (
        <ProfileInfo>
          {icons[chat.status]}
          {isMobile ? (
            <Texts>
              <MentorName variant="h2">{chat.displayName}</MentorName>
              <MentorBio isMobile variant="p">
                {'Jutellaanko? <3'}
                {/* {mentor.statusMessage} */}
              </MentorBio>
            </Texts>
          ) : (
            <>
              <MentorName variant="h2">{chat.displayName}</MentorName>
              <MentorBio variant="p">
                {'Jutellaanko? <3'}
                {/* {mentor.statusMessage} */}
              </MentorBio>
            </>
          )}
        </ProfileInfo>
      )}
      {isTablet ? (
        <IconButton
          variant="menuLines"
          sizeInPx={40}
          onClick={() => console.log('Opening menu!')}
        />
      ) : isSearchShown ? (
        <Search hideSearch={hideSearch} />
      ) : (
        <Buttons chat={chat} showSearch={showSearch} />
      )}
    </Container>
  );
};

const Container = styled.div<{ isTablet: boolean }>`
  border-bottom: 1px solid ${palette.greyLight};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  height: ${({ isTablet }) => (isTablet ? LARGE_ROW_HEIGHT : ROW_HEIGHT)};
  justify-content: space-between;
  padding: 14px 40px;
`;

const ProfileInfo = styled.div`
  align-items: center;
  display: flex;
`;

const Texts = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

const MentorName = styled(Text)`
  display: block;
  margin: 0;
  padding-left: 20px;
  white-space: nowrap;
`;

const MentorBio = styled(Text)<{ isMobile?: boolean }>`
  flex-shrink: 1;
  margin: 0;
  overflow: hidden;
  padding-left: ${isMobile => (isMobile ? '20px' : '30px')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Header;

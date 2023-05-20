import { useAppSelector, useAppDispatch } from '@/store';
import {
  ChatBuddy,
  selectLatestAndUnreadMessages,
  setActiveChat,
} from '../chatSlice';

import styled, { css } from 'styled-components';
import { palette } from '@/components/variables';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import Text from '@/components/Text';

type Props = {
  buddy: ChatBuddy;
};

const ChatMenuItem = ({ buddy }: Props) => {
  const {
    unread: { hasUnread, count },
    latest,
  } = useAppSelector(selectLatestAndUnreadMessages(buddy.buddyId));
  const activeFolder = useAppSelector(state => state.chats.activeFolder);
  const activeChatId = useAppSelector(state => state.chats.activeChatId);

  const dispatch = useAppDispatch();

  const openChat = () => {
    dispatch(setActiveChat(buddy.buddyId));
  };

  return (
    <Row
      active={buddy.buddyId === activeChatId}
      folder={activeFolder}
      onClick={openChat}
    >
      <ProfileIcon
        color={
          buddy.buddyId === activeChatId
            ? 'blueDark'
            : activeFolder === 'ok'
            ? 'purpleDark'
            : activeFolder === 'archived'
            ? 'orangeDark'
            : 'redDark'
        }
      />
      <MentorInfo>
        <BuddyName>
          <Text variant="boldSource">{buddy.displayName}</Text>
          {hasUnread && <Badge>{count}</Badge>}
        </BuddyName>
        <MessagePreview>{latest}</MessagePreview>
      </MentorInfo>
    </Row>
  );
};

const Row = styled.div<{
  active?: boolean;
  folder?: string;
}>`
  align-items: center;
  border-bottom: 1px solid ${palette.greyLight};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 80px;
  padding-left: 40px;

  ${({ active, folder }) =>
    active
      ? css`
          background-color: ${folder === 'active'
            ? palette.blue2
            : folder === 'archived'
            ? palette.orange
            : palette.redSalmon};
        `
      : css`
          &:hover {
            background-color: ${folder === 'active'
              ? palette.blueWhite
              : folder === 'archived'
              ? palette.orangeWhite
              : palette.redWhite};
          }
        `}
`;

const MentorInfo = styled.div`
  color: ${palette.blueDark};
  margin-left: 20px;
  padding-bottom: 15px;
  padding-top: 15px;
  width: 240px;
`;

const BuddyName = styled.div`
  display: flex;
  flex-direction: row;
`;

const MessagePreview = styled(Text)`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Badge = styled.div`
  align-items: center;
  background-color: ${palette.blue2};
  border-radius: 50%;
  color: ${palette.blueDark};
  display: flex;
  font-family: 'Source Sans Pro';
  font-size: '1rem',
  font-weight: 600;
  height: 27px;
  justify-content: center;
  margin-left: 10px;
  width: 27px;
`;

export default ChatMenuItem;

import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ChatContact, setActiveChat } from './chatSlice';

import { palette } from '@/components/variables';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import Text from '@/components/Text';
import type { ChatCategory } from './chatSlice';

const ChatMenuItem = ({ chat }: { chat: ChatContact }) => {
  const unreadMessages = chat.messages.filter(message => !message.opened);

  const activeCategory: ChatCategory = useSelector(
    (state: RootState) => state.chats.activeCategory,
  );
  const activeChatId = useSelector(
    (state: RootState) => state.chats.activeChatId,
  );

  const getLatestMessage = () => {
    const latestMessage = chat.messages[chat.messages.length - 1];
    if (!latestMessage) return '';

    return latestMessage.content;
  };

  const dispatch = useDispatch();
  const chooseChat = () => {
    dispatch(setActiveChat(chat.id));
  };

  return (
    <Row
      active={chat.id === activeChatId}
      category={activeCategory}
      onClick={chooseChat}
    >
      <ProfileIcon
        color={
          chat.id === activeChatId
            ? 'blueDark'
            : activeCategory === 'active'
            ? 'purpleDark'
            : activeCategory === 'archived'
            ? 'orangeDark'
            : 'redDark'
        }
      />
      <MentorInfo>
        <BuddyName>
          <Text variant="boldSource">{chat.displayName}</Text>
          {!!unreadMessages.length && <Badge>{unreadMessages.length}</Badge>}
        </BuddyName>
        <MessagePreview>{getLatestMessage()}</MessagePreview>
      </MentorInfo>
    </Row>
  );
};

const Row = styled.div<{
  active?: boolean;
  category?: string;
}>`
  align-items: center;
  border-bottom: 1px solid ${palette.greyLight};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 80px;
  padding-left: 40px;

  ${({ active, category }) =>
    active
      ? css`
          background-color: ${category === 'active'
            ? palette.blue2
            : category === 'archived'
            ? palette.orange
            : palette.redSalmon};
        `
      : css`
          &:hover {
            background-color: ${category === 'active'
              ? palette.blueWhite
              : category === 'archived'
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

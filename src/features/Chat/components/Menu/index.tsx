import { useAppSelector } from '@/store';
import { selectChats } from '@/features/Chat/chatSlice';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { CHAT_MENU_WIDTH, CHAT_MIN_HEIGHT } from '@/features/Chat/constants';
import FolderLink from './FolderLink';
import Header from './Header';
import { palette } from '@/components/variables';
import Text from '@/components/Text';
import { MenuItem } from './Item';

const Menu = () => {
  const { t } = useTranslation('chat');
  const { showFolders, activeFolder } = useAppSelector(state => state.chats);
  const chats = useAppSelector(selectChats);

  return (
    <Container>
      <Header showSearch={chats.length > 0} />
      {showFolders ||
        (['archived', 'banned'].includes(activeFolder) && (
          <FolderLink targetFolder="ok" />
        ))}
      {showFolders ? (
        <>
          <FolderLink targetFolder="archived" />
          <FolderLink targetFolder="banned" />
        </>
      ) : chats.length ? (
        <ChatList>
          {chats.map(buddy => {
            return <MenuItem buddy={buddy} key={buddy.buddyId} />;
          })}
        </ChatList>
      ) : (
        <EmptyText>{t(`menu.empty.${activeFolder}`)}</EmptyText>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  min-height: ${CHAT_MIN_HEIGHT};
  min-width: ${CHAT_MENU_WIDTH};
  width: ${CHAT_MENU_WIDTH};
`;

const ChatList = styled.div`
  overflow: auto;
`;

const EmptyText = styled(Text)`
  margin: 0;
  padding: 1.25rem 2rem;
`;

export default Menu;

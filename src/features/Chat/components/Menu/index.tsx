import { useAppSelector } from '@/store';
import { selectChats } from '@/features/Chat/chatSlice';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
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
        <>
          {chats.map(buddy => {
            return <MenuItem buddy={buddy} key={buddy.buddyId} />;
          })}
        </>
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
  flex: 0 0 400px;
  overflow: auto;
`;

const EmptyText = styled(Text)`
  margin: 0;
  padding: 1.25rem 2rem;
`;

export default Menu;

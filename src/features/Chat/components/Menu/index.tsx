// Libraries
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

// Store and hooks
import { selectChats } from '@/features/Chat/chatSlice';
import { useAppSelector } from '@/store';
import { useMobileMode } from '@/hooks/useMobileMode';
import { useTabletMode } from '@/hooks/useTabletMode';

// Variables
import {
  CHAT_MENU_WIDTH,
  CHAT_MIN_HEIGHT,
  ROW_HEIGHT,
} from '@/features/Chat/constants';
import {
  CONTENT_HEIGHT,
  FOOTER_HEIGHT,
  MOBILE_CONTENT_HEIGHT,
  NAVIGATION_HEIGHT,
  palette,
  TABLET_CONTENT_HEIGHT,
} from '@/components/variables';

// Components
import FolderLink from './FolderLink';
import Header from './Header';
import Text from '@/components/Text';
import { MenuItem } from './Item';

const Menu = () => {
  const { t } = useTranslation('chat');
  const isMobile = useMobileMode();
  const isTablet = useTabletMode();
  const { showFolders, activeFolder } = useAppSelector(state => state.chats);
  const chats = useAppSelector(selectChats);

  const menuContent = (
    <>
      <Header showSearch={chats.length > 0} />
      {(showFolders || ['archived', 'banned'].includes(activeFolder)) && (
        <FolderLink targetFolder="ok" />
      )}
      {showFolders ? (
        <>
          <FolderLink targetFolder="archived" />
          <FolderLink targetFolder="banned" />
        </>
      ) : chats.length ? (
        <ChatList
          folderLinkOnTopOfMenu={['archived', 'banned'].includes(activeFolder)}
          isTablet={isTablet}
        >
          {chats.map(buddy => {
            return <MenuItem buddy={buddy} key={buddy.buddyId} />;
          })}
        </ChatList>
      ) : (
        <EmptyText>{t(`menu.empty.${activeFolder}`)}</EmptyText>
      )}
    </>
  );

  return isTablet ? (
    <TabletContainer>{menuContent}</TabletContainer>
  ) : (
    <Container isMobile={isMobile} isTablet={isTablet}>
      {menuContent}
    </Container>
  );
};

const BaseContainer = styled.div`
  background-color: ${palette.white};
`;

const TabletContainer = styled(BaseContainer)`
  height: calc(100vh - (${NAVIGATION_HEIGHT} + ${FOOTER_HEIGHT}));
  left: 0;
  position: absolute;
  right: 0;
`;

const Container = styled(BaseContainer)<{
  isMobile: boolean;
  isTablet: boolean;
}>`
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  height: ${({ isMobile, isTablet }) =>
    isMobile
      ? MOBILE_CONTENT_HEIGHT
      : isTablet
      ? TABLET_CONTENT_HEIGHT
      : CONTENT_HEIGHT};
  min-height: ${CHAT_MIN_HEIGHT};
  min-width: ${CHAT_MENU_WIDTH};
  width: ${CHAT_MENU_WIDTH};
`;

const ChatList = styled.div<{
  folderLinkOnTopOfMenu: boolean;
  isTablet: boolean;
}>`
  ${({ folderLinkOnTopOfMenu, isTablet }) =>
    isTablet
      ? css`
          height: calc(
            100vh -
              (
                ${NAVIGATION_HEIGHT} + ${FOOTER_HEIGHT} +
                  ${folderLinkOnTopOfMenu ? 2 : 1} * ${ROW_HEIGHT}
              )
          );
        `
      : css`
          padding-bottom: 10px;
        `}
  overflow: auto;
`;

const EmptyText = styled(Text)`
  margin: 0;
  padding: 1.25rem 2rem;
`;

export default Menu;

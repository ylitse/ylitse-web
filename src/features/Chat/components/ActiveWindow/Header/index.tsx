import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { clearActiveChat } from '@/features/Chat/chatSlice';
import {
  selectIsMentor,
  selectUserId,
} from '@/features/Authentication/userSlice';
import { selectMentorById } from '@/features/MentorPage/selectors';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useGetMentorsQuery } from '@/features/MentorPage/mentorPageApi';
import { useUpdateStatusMutation } from '@/features/Chat/chatPageApi';

import {
  CHAT_GAP_WIDTH,
  CHAT_MENU_WIDTH,
  HIGH_ROW_HEIGHT,
  ROW_HEIGHT,
} from '@/features/Chat/constants';
import { CONTENT_WIDTH, ICON_SIZES, palette } from '@/components/constants';

import ArchivedIcon from '@/static/icons/archived-chats.svg';
import BlockedIcon from '@/static/icons/blocked-chats.svg';
import DesktopButtons from './DesktopButtons';
import Dialog from '@/components/Dialog';
import { IconButton } from '@/components/Buttons';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import ReportModal from '../ReportModal';
import TabletButtons from './TabletButtons';
import Text from '@/components/Text';

import type { ChatBuddy } from '@/features/Chat/mappers';
import type { ChatFolder } from '@/features/Chat/chatPageApi';

type ConfirmDialogVariant = 'archive' | 'block' | 'restore';
type DialogVariant = ConfirmDialogVariant | 'report';

const confirmDialogMap: Record<
  ConfirmDialogVariant,
  { borderColor: string; targetFolder: ChatFolder }
> = {
  archive: { borderColor: palette.orange, targetFolder: 'archived' },
  block: { borderColor: palette.redSalmon, targetFolder: 'banned' },
  restore: { borderColor: palette.blue2, targetFolder: 'ok' },
};

const iconMap = {
  ok: <ProfileIcon color="purpleDark" />,
  archived: <img src={ArchivedIcon} />,
  banned: <img src={BlockedIcon} />,
};

type Props = {
  chat: ChatBuddy;
};

const Header = ({ chat }: Props) => {
  const { t } = useTranslation('chat');
  const dispatch = useAppDispatch();
  const { isTablet } = useGetLayoutMode();
  const [updateChatStatus] = useUpdateStatusMutation();
  const userId = useAppSelector(selectUserId);

  // Clearing the active chat will return to the menu in tablet mode
  const returnToTabletMenu = () => dispatch(clearActiveChat());

  useGetMentorsQuery();

  const isMentor = useAppSelector(selectIsMentor);
  const mentor = useAppSelector(selectMentorById(chat.buddyId));

  const [dialogVariant, setDialogVariant] = useState<DialogVariant>('archive');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isConfirmDialogOpen = isDialogOpen && dialogVariant !== 'report';
  const isReportModalOpen = isDialogOpen && dialogVariant === 'report';

  const openDialog = (variant: DialogVariant) => {
    setDialogVariant(variant);
    setIsDialogOpen(true);
  };

  const confirm = () => {
    setIsDialogOpen(false);
    if (!userId || dialogVariant == 'report') return;
    updateChatStatus({
      userId,
      buddyId: chat.buddyId,
      status: confirmDialogMap[dialogVariant].targetFolder,
    });
  };

  return (
    <Container tablet={isTablet}>
      {isConfirmDialogOpen && (
        <Dialog // REFAKTOROI
          borderColor={confirmDialogMap[dialogVariant].borderColor}
          closeText={t('dialog.cancel')}
          confirmId={`confirm-${dialogVariant}`}
          confirmText={t(`dialog.${dialogVariant}.confirm`)}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={confirm}
          description={t(`dialog.${dialogVariant}.description`, {
            buddyName: chat.displayName,
          })}
          title={t(`dialog.${dialogVariant}.title`)}
        />
      )}
      {isReportModalOpen && (
        <ReportModal
          buddyId={chat.buddyId}
          close={() => setIsDialogOpen(false)}
        />
      )}

      {isTablet && (
        <IconButton
          variant="back"
          sizeInPx={ICON_SIZES.LARGE}
          onClick={returnToTabletMenu}
        />
      )}
      <IconContainer>{iconMap[chat.status]}</IconContainer>
      <DisplayName variant="h2">{chat.displayName}</DisplayName>
      {isMentor && (
        <MentorBio isTablet={isTablet}>{mentor?.statusMessage}</MentorBio>
      )}

      <ButtonsWrapper>
        {isTablet ? (
          <TabletButtons chat={chat} openDialog={openDialog} />
        ) : (
          <DesktopButtons chat={chat} openDialog={openDialog} />
        )}
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

const DisplayName = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MentorBio = styled(Text)<{ isTablet: boolean }>`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonsWrapper = styled.div`
  margin-left: auto;
`;

export default Header;

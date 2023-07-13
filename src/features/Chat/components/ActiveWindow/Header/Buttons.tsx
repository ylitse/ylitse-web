import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ChatFolder,
  useUpdateStatusMutation,
} from '@/features/Chat/chatPageApi';
import { useAppSelector } from '@/store';
import { selectUserId } from '@/features/Authentication/userSlice';

import type { ChatBuddy } from '@/features/Chat/chatSlice';

import styled from 'styled-components';

import ConfirmationDialog, { DialogVariant } from '../ConfirmationDialog';
import { IconButton, StatusButton } from '@/components/Buttons';

type Props = {
  chat: ChatBuddy;
  showSearch: () => void;
};

const Buttons = ({ chat, showSearch }: Props) => {
  const { t } = useTranslation('chat');

  const [dialogVariant, setDialogVariant] = useState<DialogVariant>('archive');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);

  const openDialog = (variant: DialogVariant) => {
    setDialogVariant(variant);
    setIsDialogOpen(true);
  };

  const [updateChatStatus] = useUpdateStatusMutation();
  const userId = useAppSelector(selectUserId);

  const updateStatus = (status: ChatFolder) => {
    if (isDialogOpen) closeDialog();
    if (!userId) return;
    updateChatStatus({ userId, buddyId: chat.buddyId, status });
  };

  return (
    <>
      {isDialogOpen && (
        <ConfirmationDialog
          variant={dialogVariant}
          buddyName={chat.displayName}
          close={closeDialog}
          confirm={() =>
            updateStatus(dialogVariant === 'archive' ? 'archived' : 'banned')
          }
        />
      )}
      <Container>
        <IconButton variant="search" sizeInPx={24} onClick={showSearch} />
        {chat.status === 'ok' ? (
          <>
            <StatusButton
              onClick={() => openDialog('archive')}
              icon="archive"
              text={t('header.archive')}
            />
            <StatusButton
              onClick={() => openDialog('block')}
              icon="block"
              text={t('header.block')}
            />
          </>
        ) : (
          <StatusButton
            onClick={() => updateStatus('ok')}
            icon="return"
            text={t('header.restore')}
          />
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
`;

export default Buttons;

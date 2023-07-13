import { useTranslation } from 'react-i18next';

import {
  ChatFolder,
  useUpdateStatusMutation,
} from '@/features/Chat/chatPageApi';
import { useAppSelector } from '@/store';
import { selectUserId } from '@/features/Authentication/userSlice';

import type { ChatBuddy } from '@/features/Chat/chatSlice';

import styled from 'styled-components';
import { IconButton, StatusButton, TextButton } from '@/components/Buttons';
import Text from '@/components/Text';
import { useState } from 'react';

type DialogType = 'archive' | 'block';

type Props = {
  chat: ChatBuddy;
  showSearch: () => void;
};

const Buttons = ({ chat, showSearch }: Props) => {
  const { t } = useTranslation('chat');

  const [dialogType, setDialogType] = useState<DialogType>('archive');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);

  const openDialog = (type: DialogType) => {
    setDialogType(type);
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
        <ConfirmationDialog>
          <Text variant="h3">{t(`dialog.${dialogType}.title`)}</Text>
          <Text>{t(`dialog.${dialogType}.description`)}</Text>
          <TextButton onClick={closeDialog} variant="light">
            {t('dialog.cancel')}
          </TextButton>
          <TextButton
            onClick={() =>
              updateStatus(dialogType === 'archive' ? 'archived' : 'banned')
            }
            variant="dark"
          >
            {t(`dialog.${dialogType}.confirm`)}
          </TextButton>
        </ConfirmationDialog>
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

const ConfirmationDialog = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 223px;
  justify-content: center;
  padding: 20px;
  width: 687px;
  z-index: 1000000;
`;

export default Buttons;

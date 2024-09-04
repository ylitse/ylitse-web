import { useTranslation } from 'react-i18next';

import {
  Buddy,
  ChatFolder,
  useUpdateStatusMutation,
} from '@/features/Chat/chatPageApi';
import { useAppSelector } from '@/store';
import { selectUserId } from '@/features/Authentication/userSlice';

import { palette } from '@/components/variables';
import Dialog from '@/components/Dialog';

import type { ConfirmationDialogVariant } from '.';

type Props = {
  variant: ConfirmationDialogVariant;
  chat: Buddy;
  close: () => void;
};

const ConfirmationDialog = ({ variant, chat, close }: Props) => {
  const { t } = useTranslation('chat');

  const [updateChatStatus] = useUpdateStatusMutation();
  const userId = useAppSelector(selectUserId);

  const variants: Record<
    ConfirmationDialogVariant,
    { borderColor: string; targetFolder: ChatFolder }
  > = {
    archive: { borderColor: palette.orange, targetFolder: 'archived' },
    block: { borderColor: palette.redSalmon, targetFolder: 'banned' },
    restore: { borderColor: palette.blue2, targetFolder: 'ok' },
  };

  const confirm = () => {
    close();
    if (!userId) return;
    const status: ChatFolder = variants[variant].targetFolder;
    updateChatStatus({ userId, buddyId: chat.buddyId, status });
  };

  return (
    <Dialog
      borderColor={variants[variant].borderColor}
      closeText={t('dialog.cancel')}
      confirmText={t(`dialog.${variant}.confirm`)}
      onClose={close}
      onConfirm={confirm}
      description={t(`dialog.${variant}.description`, {
        buddyName: chat.displayName,
      })}
      title={t(`dialog.${variant}.title`)}
    />
  );
};

export default ConfirmationDialog;

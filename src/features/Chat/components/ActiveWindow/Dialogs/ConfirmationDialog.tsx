import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  Buddy,
  ChatFolder,
  useUpdateStatusMutation,
} from '@/features/Chat/chatPageApi';
import { useAppSelector } from '@/store';
import { selectUserId } from '@/features/Authentication/userSlice';

import { DEFAULT_ICON_SIZE, palette } from '@/components/variables';
import { DIALOG_WIDTH } from '@/features/Chat/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import IconWarning from '@/static/icons/warning.svg';
import Text from '@/components/Text';

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
    <>
      <Overlay />
      <Container borderColor={variants[variant].borderColor}>
        <WarningIcon src={IconWarning} />
        <CloseButton
          variant="closeWithBackground"
          sizeInPx={DEFAULT_ICON_SIZE.LARGE}
          onClick={close}
        />
        <Text variant="h3">{t(`dialog.${variant}.title`)}</Text>
        <Text>
          {t(`dialog.${variant}.description`, { buddyName: chat.displayName })}
        </Text>
        <ButtonContainer>
          <TextButton onClick={close} variant="light">
            {t('dialog.cancel')}
          </TextButton>
          <TextButton onClick={confirm} variant="dark">
            {t(`dialog.${variant}.confirm`)}
          </TextButton>
        </ButtonContainer>
      </Container>
    </>
  );
};

const Overlay = styled.div`
  background: var(--greyscale-overlay, rgba(57, 57, 57, 0.75));
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
`;

const Container = styled.div<{ borderColor: string }>`
  background-color: ${palette.white};
  border-left: ${({ borderColor }) => `110px solid ${borderColor}`};
  border-radius: 10px;
  box-sizing: border-box;
  height: 223px;
  left: 50%;
  padding: 1rem 3rem;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${DIALOG_WIDTH};
  z-index: 200;
`;

const WarningIcon = styled.img`
  left: -79px;
  position: absolute;
  top: 56px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 13px;
  top: 13px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.75rem;
  justify-content: center;
`;

export default ConfirmationDialog;

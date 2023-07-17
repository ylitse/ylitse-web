import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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

  return (
    <>
      {isDialogOpen && (
        <ConfirmationDialog
          variant={dialogVariant}
          chat={chat}
          close={closeDialog}
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
            onClick={() => openDialog('restore')}
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

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ChatBuddy } from '@/features/Chat/chatSlice';
import type { ConfirmationDialogVariant } from '../Dialogs';

import styled from 'styled-components';
import { Button, IconButton, StatusButton } from '@/components/Buttons';
import { ConfirmationDialog, ReportDialog } from '../Dialogs';

type Props = {
  chat: ChatBuddy;
  showSearch: () => void;
};

const Buttons = ({ chat, showSearch }: Props) => {
  const { t } = useTranslation('chat');

  const [dialogVariant, setDialogVariant] =
    useState<ConfirmationDialogVariant>('archive');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);

  const openDialog = (variant: ConfirmationDialogVariant | 'report') => {
    if (variant === 'report') {
      setIsReportDialogOpen(true);
    } else {
      setDialogVariant(variant);
      setIsDialogOpen(true);
    }
  };

  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const closeReportDialog = () => setIsReportDialogOpen(false);

  return (
    <>
      {isDialogOpen && (
        <ConfirmationDialog
          variant={dialogVariant}
          chat={chat}
          close={closeDialog}
        />
      )}
      {isReportDialogOpen && <ReportDialog close={closeReportDialog} />}
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
        <Button
          onClick={() => openDialog('report')}
          leftIcon={'danger'}
          sizeInPx={24}
          text={{
            color: 'purple',
            text: t('header.report'),
            variant: 'link',
          }}
        />
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

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button, IconButton, StatusButton } from '@/components/Buttons';
import { DEFAULT_ICON_SIZE } from '@/components/variables';
import Search from './Search';

import type { ChatBuddy } from '@/features/Chat/chatSlice';
import type { DialogVariant } from '../Dialogs';

type Props = {
  chat: ChatBuddy;
  openDialog: (variant: DialogVariant) => void;
};

const DesktopButtons = ({ chat, openDialog }: Props) => {
  const { t } = useTranslation('chat');
  const [isSearchShown, setIsSearchShown] = useState(false);
  const showSearch = () => setIsSearchShown(true);
  const hideSearch = () => setIsSearchShown(false);

  const openArchiveDialog = () => openDialog('archive');
  const openBlockDialog = () => openDialog('block');
  const openRestoreDialog = () => openDialog('restore');
  const openReportDialog = () => openDialog('report');

  return isSearchShown ? (
    <Search hideSearch={hideSearch} />
  ) : (
    <Container>
      <IconButton
        variant="search"
        sizeInPx={DEFAULT_ICON_SIZE}
        onClick={showSearch}
      />
      {chat.status === 'ok' ? (
        <>
          <StatusButton
            onClick={openArchiveDialog}
            icon="archive"
            text={t('header.archive')}
          />
          <StatusButton
            onClick={openBlockDialog}
            icon="block"
            text={t('header.block')}
          />
        </>
      ) : (
        <StatusButton
          onClick={openRestoreDialog}
          icon="return"
          text={t('header.restore')}
        />
      )}
      <Button
        onClick={openReportDialog}
        leftIcon={'danger'}
        sizeInPx={DEFAULT_ICON_SIZE}
        text={{
          color: 'purple',
          text: t('header.report'),
          variant: 'link',
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
`;

export default DesktopButtons;

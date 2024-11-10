import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { selectIsMentee } from '@/features/Authentication/selectors';
import { useAppSelector } from '@/store';

import { Button, StatusButton } from '@/components/Buttons';
import { ICON_SIZES } from '@/components/constants';

import type { ChatBuddy } from '@/features/Chat/mappers';

type DialogVariant = 'archive' | 'block' | 'restore' | 'unblock';

type Props = {
  chat: ChatBuddy;
  confirmStatusChange: (variant: DialogVariant) => void;
  openReportModal: () => void;
};

const DesktopButtons = ({
  chat,
  confirmStatusChange,
  openReportModal,
}: Props) => {
  const { t } = useTranslation('chat');
  const isMentee = useAppSelector(selectIsMentee);

  const openArchiveDialog = () => confirmStatusChange('archive');
  const openBlockDialog = () => confirmStatusChange('block');
  const openRestoreDialog = () => confirmStatusChange('restore');
  const openUnblockDialog = () => confirmStatusChange('unblock');

  return (
    <Container>
      {chat.status === 'ok' && (
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
      )}
      {chat.status === 'archived' && (
        <StatusButton
          onClick={openRestoreDialog}
          icon="return"
          text={t('header.restore')}
        />
      )}
      {chat.status === 'banned' && (
        <StatusButton
          onClick={openUnblockDialog}
          icon="return"
          text={t('header.unblock')}
        />
      )}
      {isMentee && (
        <Button
          onClick={openReportModal}
          leftIcon={'danger'}
          sizeInPx={ICON_SIZES.SMALL}
          text={{
            color: 'purple',
            text: t('header.report'),
            variant: 'link',
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
`;

export default DesktopButtons;

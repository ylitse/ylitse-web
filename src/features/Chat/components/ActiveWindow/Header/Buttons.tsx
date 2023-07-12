import { useTranslation } from 'react-i18next';

import {
  ChatFolder,
  useUpdateStatusMutation,
} from '@/features/Chat/chatPageApi';
import { useAppSelector } from '@/store';
import { selectUserId } from '@/features/Authentication/userSlice';

import type { ChatBuddy } from '@/features/Chat/chatSlice';

import styled from 'styled-components';
import { IconButton, StatusButton } from '@/components/Buttons';

type Props = {
  chat: ChatBuddy;
  showSearch: () => void;
};

const Buttons = ({ chat, showSearch }: Props) => {
  const { t } = useTranslation('chat');

  const [updateChatStatus] = useUpdateStatusMutation();
  const userId = useAppSelector(selectUserId);

  const updateStatus = (status: ChatFolder) => {
    if (!userId) return;
    updateChatStatus({ userId, buddyId: chat.buddyId, status });
  };

  return (
    <Container>
      <IconButton variant="search" sizeInPx={24} onClick={showSearch} />
      {chat.status === 'ok' ? (
        <>
          <StatusButton
            onClick={() => updateStatus('archived')}
            icon="archive"
            text={t('header.archive')}
          />
          <StatusButton
            onClick={() => updateStatus('banned')}
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
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
`;

export default Buttons;

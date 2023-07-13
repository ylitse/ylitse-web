import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

export type DialogVariant = 'archive' | 'block';

type Props = {
  variant: DialogVariant;
  close: () => void;
  confirm: () => void;
};

const ConfirmationDialog = ({ variant, close, confirm }: Props) => {
  const { t } = useTranslation('chat');

  return (
    <Container>
      <Text variant="h3">{t(`dialog.${variant}.title`)}</Text>
      <Text>{t(`dialog.${variant}.description`)}</Text>
      <TextButton onClick={close} variant="light">
        {t('dialog.cancel')}
      </TextButton>
      <TextButton onClick={confirm} variant="dark">
        {t(`dialog.${variant}.confirm`)}
      </TextButton>
    </Container>
  );
};

const Container = styled.div`
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

export default ConfirmationDialog;

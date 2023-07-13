import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { IconButton, TextButton } from '@/components/Buttons';
import { palette } from '@/components/variables';
import Text from '@/components/Text';
import IconWarning from '@/static/icons/warning.svg';

export type DialogVariant = 'archive' | 'block';

type Props = {
  variant: DialogVariant;
  buddyName: string;
  close: () => void;
  confirm: () => void;
};

const ConfirmationDialog = ({ variant, buddyName, close, confirm }: Props) => {
  const { t } = useTranslation('chat');

  return (
    <Container>
      <WarningIcon src={IconWarning} />
      <IconButton variant="closeWithBackground" sizeInPx={34} onClick={close} />
      <Text variant="h3">{t(`dialog.${variant}.title`)}</Text>
      <Text>{t(`dialog.${variant}.description`, { buddyName })}</Text>
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
  background-color: ${palette.white};
  border-left: 110px solid ${palette.orange};
  border-radius: 10px;
  height: 223px;
  padding: 1rem;
  width: 687px;
  z-index: 10;
`;

const WarningIcon = styled.img``;

export default ConfirmationDialog;

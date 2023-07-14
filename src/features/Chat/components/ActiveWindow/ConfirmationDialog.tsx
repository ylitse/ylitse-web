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
    <>
      <Overlay />
      <Container variant={variant}>
        <WarningIcon src={IconWarning} />
        <CloseButton
          variant="closeWithBackground"
          sizeInPx={46}
          onClick={close}
        />
        <Title variant="h3">{t(`dialog.${variant}.title`)}</Title>
        <Text>{t(`dialog.${variant}.description`, { buddyName })}</Text>
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

const Container = styled.div<{ variant: DialogVariant }>`
  background-color: ${palette.white};
  border-left: ${({ variant }) =>
    `110px solid ${
      variant === 'archive' ? palette.orange : palette.redSalmon
    }`};
  border-radius: 10px;
  box-sizing: border-box;
  height: 223px;
  left: 50%;
  padding: 1rem 3rem;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 687px;
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

const Title = styled(Text)`
  margin-bottom: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.75rem;
  justify-content: center;
`;

export default ConfirmationDialog;

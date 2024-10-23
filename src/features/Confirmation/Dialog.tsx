import styled from 'styled-components';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { DIALOG_WIDTH } from '@/components/constants';
import { IconButton } from '@/components/Buttons';
import { ICON_SIZES, palette } from '@/components/constants';
import IconSuccess from '@/static/icons/success.svg';
import IconWarning from '@/static/icons/warning.svg';
import Text from '@/components/Text';
import ButtonGroup from './ButtonGroup';

export type IconVariant = 'success' | 'warning';

const iconMap: Record<IconVariant, string> = {
  success: IconSuccess,
  warning: IconWarning,
};

type Props = {
  borderColor: string;
  closeText: string;
  confirmId?: string;
  confirmText?: string;
  description: string;
  iconVariant?: IconVariant;
  isConfirmRequired?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
};

const Dialog = ({
  borderColor,
  closeText,
  confirmId,
  confirmText = '',
  description,
  iconVariant = 'warning',
  isConfirmRequired = true,
  onClose,
  onConfirm,
  title,
}: Props) => {
  const { isMobile } = useGetLayoutMode();

  return (
    <>
      <Overlay />
      {isMobile ? (
        <MobileContainer>
          <Header backgroundColor={borderColor}>
            <img src={iconMap[iconVariant]} />
            <Text variant="h3">{title}</Text>
          </Header>
          <Content>
            <Text>{description}</Text>
            <ButtonGroup
              closeText={closeText}
              confirmId={confirmId}
              confirmText={confirmText}
              isConfirmRequired={isConfirmRequired}
              onClose={onClose}
              onConfirm={onConfirm}
            />
          </Content>
        </MobileContainer>
      ) : (
        <Container borderColor={borderColor}>
          <Icon src={iconMap[iconVariant]} />
          <CloseButton
            variant="closeWithBackground"
            sizeInPx={ICON_SIZES.MEDIUM}
            onClick={onClose}
          />
          <Text variant="h3">{title}</Text>
          <Text>{description}</Text>
          <ButtonGroup
            closeText={closeText}
            confirmId={confirmId}
            confirmText={confirmText}
            isConfirmRequired={isConfirmRequired}
            onClose={onClose}
            onConfirm={onConfirm}
          />
        </Container>
      )}
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

const MobileContainer = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-sizing: border-box;
  height: fit-content;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  z-index: 200;
`;

const Header = styled.div<{ backgroundColor: string }>`
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 10px 10px 0 0;
  box-sizing: border-box;
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
`;

const Content = styled.div`
  padding: 0 2rem 2rem;
`;

const Container = styled.div<{ borderColor: string }>`
  background-color: ${palette.white};
  border-left: ${({ borderColor }) => `110px solid ${borderColor}`};
  border-radius: 10px;
  box-sizing: border-box;
  height: 250px;
  left: 50%;
  padding: 2rem 3rem;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${DIALOG_WIDTH};
  z-index: 200;
`;

const Icon = styled.img`
  left: -79px;
  position: absolute;
  top: 56px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 13px;
  top: 13px;
`;

export default Dialog;

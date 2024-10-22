import styled from 'styled-components';
import { TextButton } from '../Buttons';

type Props = {
  closeText: string;
  confirmId?: string;
  confirmText?: string;
  isConfirmRequired: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};

const ButtonGroup = ({
  closeText,
  confirmId,
  confirmText,
  isConfirmRequired,
  onClose,
  onConfirm,
}: Props) => (
  <ButtonContainer>
    <TextButton
      onClick={onClose}
      variant={isConfirmRequired ? 'light' : 'dark'}
    >
      {closeText}
    </TextButton>
    {isConfirmRequired && (
      <TextButton id={confirmId} onClick={onConfirm} variant="dark">
        {confirmText}
      </TextButton>
    )}
  </ButtonContainer>
);

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.75rem;
  justify-content: center;
`;

export default ButtonGroup;

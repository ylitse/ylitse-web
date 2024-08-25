import { palette } from '../variables';
import {
  Toast,
  ToastType,
  resolveValue,
  toast as toastEffect,
} from 'react-hot-toast';
import styled from 'styled-components';
import { IconButton } from '../Buttons';
import Text from '../Text';
import { Warning } from '@/components/Icons/Warning';
import { Success } from '@/components/Icons/Success';

type Props = {
  toast: Toast;
};

export const AppToast = ({ toast }: Props) => {
  const handleClose = (id: string) => {
    toastEffect.dismiss(id);
  };

  const getToastStyle = (type: ToastType) => {
    switch (type) {
      case 'error': {
        return {
          mainColor: palette.red,
          Icon: <Warning color={'blueDark'} sizeInPx={23} />,
        };
      }

      case 'success': {
        return {
          mainColor: palette.blue,
          Icon: <Success color={'blueDark'} sizeInPx={23} />,
        };
      }

      default: {
        return {
          mainColor: palette.purple,
          Icon: <Warning color={'orange'} sizeInPx={23} />,
        };
      }
    }
  };

  const { mainColor, Icon } = getToastStyle(toast.type);

  return (
    <Container
      role="notification"
      isVisible={toast.visible}
      borderColor={mainColor}
    >
      <IconContainer bgColor={mainColor}>{Icon}</IconContainer>
      <MessageContainer>
        <Text>{resolveValue(toast.message, toast)}</Text>
      </MessageContainer>
      <ButtonContainer>
        <IconButton
          variant="closeWithBackground"
          sizeInPx={40}
          onClick={() => handleClose(toast.id)}
        />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div<{ isVisible: boolean; borderColor: string }>`
  background-color: ${palette.white};
  border: solid 2px ${({ borderColor }) => borderColor};
  display: flex;
  gap: 1rem;
  height: 80px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  width: 560px;
`;

const IconContainer = styled.div<{ bgColor: string }>`
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  flex: 1;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 1rem;
`;

const MessageContainer = styled.div`
  align-items: center;
  background-color: ${palette.white};
  display: flex;
  flex: 10;
  justify-content: center;
`;

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { IconButton } from '@/components/Buttons';
import { ICON_SIZES, palette } from '@/components/constants';
import TextInput from '@/components/TextInput';

type Props = {
  handleSend: () => void;
  isInputDisabled: boolean;
  isSendDisabled: boolean;
  message: string;
  onChange: (message: string) => void;
};

const MessageField = ({
  handleSend,
  isInputDisabled,
  isSendDisabled,
  message,
  onChange,
}: Props) => {
  const { t } = useTranslation('chat');
  const { isMobile } = useGetLayoutMode();

  return (
    <Container>
      <Input
        variant="textarea"
        color={message ? 'blueDark' : 'greyFaded'}
        isDisabled={isInputDisabled}
        onChange={onChange}
        placeholder={t('input.placeholder')}
        value={message}
        isMobile={isMobile}
      />
      <SendButton
        variant="send"
        isDisabled={isSendDisabled}
        sizeInPx={ICON_SIZES.HUGE}
        onClick={handleSend}
      />
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
`;

const Input = styled(TextInput)<{ isMobile: boolean }>`
  flex: 1;
  margin: 1rem 1rem 1rem 2rem;

  &:focus {
    outline: 1px solid ${palette.purple};
  }
`;

const SendButton = styled(IconButton)`
  margin-right: 1.25rem;
`;

export default MessageField;

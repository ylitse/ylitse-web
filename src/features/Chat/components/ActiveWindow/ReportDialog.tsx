import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { IconButton, TextButton } from '@/components/Buttons';
import { palette } from '@/components/variables';
import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import { useState } from 'react';

export type DialogVariant = 'archive' | 'block' | 'restore';

type Props = {
  close: () => void;
};

const ReportDialog = ({ close }: Props) => {
  const { t } = useTranslation('chat');

  const [reportReason, setReportReason] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  return (
    <>
      <Overlay />
      <Container>
        <CloseButton
          variant="closeWithBackground"
          sizeInPx={38}
          onClick={close}
        />
        <Title color="white" variant="h1">
          Ilmianna käyttäjä
        </Title>
        <Text>{t('dialog.report.description1')}</Text>
        <Text>{t('dialog.report.description2')}</Text>
        <Text>{t('dialog.report.description3')}</Text>
        <Text>{t('dialog.report.description4')}</Text>
        <TextInput onChange={setReportReason} value={reportReason} />
        <TextInput onChange={setContactInfo} value={contactInfo} />
        <ButtonContainer>
          <TextButton onClick={close} variant="light">
            Peruuta
          </TextButton>
          <TextButton onClick={close} variant="dark">
            Lähetä
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

const Container = styled.div`
  align-items: center;
  background-color: ${palette.white};
  border-radius: 20px;
  border-top: 140px solid ${palette.purple};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 905;
  left: 50%;
  padding: 3rem 5rem;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 667x;
  z-index: 200;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 17px;
  top: -123px;
`;

const Title = styled(Text)`
  position: absolute;
  top: -100px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.75rem;
  justify-content: center;
`;

export default ReportDialog;

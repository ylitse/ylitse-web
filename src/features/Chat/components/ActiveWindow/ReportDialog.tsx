import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { IconButton, TextButton } from '@/components/Buttons';
import IconSuccess from '@/static/icons/success.svg';
import LabeledInput from '@/components/LabeledInput';
import { palette } from '@/components/variables';
import Text from '@/components/Text';
import { useState } from 'react';

type Props = {
  close: () => void;
};

const ReportDialog = ({ close }: Props) => {
  const { t } = useTranslation('chat');

  const sendReportRequest = () => {
    console.log(reportReason);
    console.log(contactInfo);
    setIsReported(true);
  };

  const [isReported, setIsReported] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  return (
    <>
      <Overlay />
      {isReported ? (
        <SuccessContainer borderColor={palette.blue}>
          <SuccessIcon src={IconSuccess} />
          <SuccessCloseButton
            variant="closeWithBackground"
            sizeInPx={46}
            onClick={close}
          />
          <SuccessTitle variant="h3">
            {t(`dialog.report.success.title`)}
          </SuccessTitle>
          <Text>{t(`dialog.report.success.description`)}</Text>
          <ButtonContainer>
            <OkButton onClick={close} variant="dark">
              {t(`dialog.report.success.confirm`)}
            </OkButton>
          </ButtonContainer>
        </SuccessContainer>
      ) : (
        <Container>
          <CloseButton
            variant="closeWithBackground"
            sizeInPx={38}
            onClick={close}
          />
          <Title color="white" variant="h1">
            {t('dialog.report.title')}
          </Title>
          <Paragraph>{t('dialog.report.description1')}</Paragraph>
          <Paragraph>{t('dialog.report.description2')}</Paragraph>
          <Paragraph>{t('dialog.report.description3')}</Paragraph>
          <Paragraph>{t('dialog.report.description4')}</Paragraph>
          <LabeledInput
            label={t('dialog.report.input.reason')}
            onChange={setReportReason}
            value={reportReason}
          />
          <LabeledInput
            label={t('dialog.report.input.contactInfo')}
            onChange={setContactInfo}
            value={contactInfo}
          />
          <ButtonContainer>
            <TextButton onClick={close} variant="light">
              {t('dialog.cancel')}
            </TextButton>
            <TextButton onClick={sendReportRequest} variant="dark">
              {t('dialog.report.confirm')}
            </TextButton>
          </ButtonContainer>
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

const SuccessContainer = styled.div<{ borderColor: string }>`
  background-color: ${palette.white};
  border-left: ${({ borderColor }) => `110px solid ${borderColor}`};
  border-radius: 10px;
  box-sizing: border-box;
  height: 267px;
  left: 50%;
  padding: 1rem 3rem;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 687px;
  z-index: 200;
`;

const SuccessIcon = styled.img`
  left: -79px;
  position: absolute;
  top: 56px;
`;

const SuccessCloseButton = styled(IconButton)`
  position: absolute;
  right: 13px;
  top: 13px;
`;

const SuccessTitle = styled(Text)`
  margin-bottom: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.75rem;
  justify-content: center;
`;

const OkButton = styled(TextButton)`
  width: 113px;
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

const Paragraph = styled(Text)`
  margin-bottom: 1rem;
  margin-top: 0;
`;

export default ReportDialog;

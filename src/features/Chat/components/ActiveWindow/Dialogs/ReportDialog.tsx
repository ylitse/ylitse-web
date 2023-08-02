import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectUserId } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';
import { useReportMentorMutation } from '@/features/Chat/chatPageApi';

import styled from 'styled-components';
import { IconButton, TextButton } from '@/components/Buttons';
import LabeledInput from '@/components/LabeledInput';
import { palette } from '@/components/variables';
import ReportSuccessDialog from './ReportSuccessDialog';
import Text from '@/components/Text';

type Props = {
  buddyId: string;
  close: () => void;
};

const ReportDialog = ({ buddyId, close }: Props) => {
  const { t } = useTranslation('chat');

  const userId = useAppSelector(selectUserId);
  const [reportMentor, { isSuccess }] = useReportMentorMutation();

  useEffect(() => {
    if (isSuccess) {
      setIsReported(true);
    }
  }, [isSuccess]);

  const sendReportRequest = async () => {
    if (!userId) return;
    reportMentor({ buddyId, contactInfo, reportReason, userId });
  };

  const [isReported, setIsReported] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  return (
    <>
      <Overlay />
      {isReported ? (
        <ReportSuccessDialog close={close} />
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
          <Content>
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
            <ButtonContainerWithMargin>
              <ActionButton onClick={close} variant="light">
                {t('dialog.cancel')}
              </ActionButton>
              <ActionButton onClick={sendReportRequest} variant="dark">
                {t('dialog.report.confirm')}
              </ActionButton>
            </ButtonContainerWithMargin>
          </Content>
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

const Container = styled.div`
  align-items: center;
  background-color: ${palette.white};
  border-radius: 20px;
  border-top: 140px solid ${palette.purple};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 905px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 667px;
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

const Content = styled.div`
  padding: 1.5rem 5rem;
`;

const Paragraph = styled(Text)`
  margin-bottom: 1rem;
  margin-top: 0;
`;

const ButtonContainerWithMargin = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 2.5rem;
`;

const ActionButton = styled(TextButton)`
  flex-grow: 1;
`;

export default ReportDialog;

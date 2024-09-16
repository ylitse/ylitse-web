import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  selectAccountId,
  selectUserInfo,
} from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';

import { ButtonRow, Section, Value } from '.';
import { Column, SpacedRow } from '@/components/common';
import { DEFAULT_ICON_SIZE, EMAIL_REGEX } from '@/components/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import LabeledInput from '@/components/LabeledInput';
import Text from '@/components/Text';
import { useUpdateEmailMutation } from '../profilePageApi';

const EmailEditor = () => {
  const { t } = useTranslation('profile');
  const accountId = useAppSelector(selectAccountId);
  const userInfo = useAppSelector(selectUserInfo);

  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  const [email, setEmail] = useState<string>('');

  const isEmailMissing = !email.length;
  const emailValue = isEmailMissing ? t('account.email.missing') : email;
  const isEmailInvalid = email.length > 0 && !email.match(EMAIL_REGEX);
  const isSavingDisabled = isEmailMissing || isEmailInvalid;

  useEffect(() => {
    setEmail(userInfo.email ?? '');
  }, [userInfo.email]);

  const [updateEmail] = useUpdateEmailMutation();

  const saveNewEmail = async () => {
    await updateEmail({ accountId, email });
    setIsOpen(false);
    // TODO: Show error notification
  };

  return isOpen ? (
    <Section>
      <LabeledInput
        error={isEmailInvalid ? t('account.email.invalid') : null}
        label={t('account.email.label')}
        onChange={setEmail}
        value={email}
      />
      <ButtonRow>
        <TextButton onClick={toggleIsOpen} variant="light">
          {t('account.cancel')}
        </TextButton>
        <TextButton
          variant={isSavingDisabled ? 'disabled' : 'dark'}
          onClick={saveNewEmail}
        >
          {t('account.save')}
        </TextButton>
      </ButtonRow>
      <Text variant="blueBox">{t('account.email.info')}</Text>
    </Section>
  ) : (
    <Section>
      <SpacedRow>
        <Column>
          <Text variant="label">{t('account.email.label')}</Text>
          <Value>{emailValue}</Value>
        </Column>
        <IconButton
          variant="edit"
          sizeInPx={DEFAULT_ICON_SIZE.LARGE}
          onClick={toggleIsOpen}
        />
      </SpacedRow>
      <Text variant="blueBox">{t('account.email.info')}</Text>
    </Section>
  );
};

export default EmailEditor;

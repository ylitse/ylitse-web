import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectUserInfo } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';

import { ButtonRow, Section, Value } from '.';
import { Column, SpacedRow } from '@/components/common';
import { DEFAULT_ICON_SIZE, EMAIL_REGEX } from '@/components/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import LabeledInput from '@/components/LabeledInput';
import Text from '@/components/Text';

const EmailEditor = () => {
  const { t } = useTranslation('profile');
  const userInfo = useAppSelector(selectUserInfo);

  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  const [email, setEmail] = useState<string>('');

  const isEmailMissing = !email.length;
  const emailValue = isEmailMissing ? t('account.emailMissing') : email;
  const isEmailInvalid = email.length > 0 && !email.match(EMAIL_REGEX);
  const isSavingDisabled = isEmailMissing || isEmailInvalid;

  useEffect(() => {
    setEmail(userInfo.email ?? '');
  }, [userInfo.email]);

  const saveNewEmail = () => {
    console.log('API: Save new email');
    setIsOpen(false);
  };

  return isOpen ? (
    <Section>
      <LabeledInput
        error={isEmailInvalid ? t('account.emailError') : null}
        label={t('account.email')}
        onChange={setEmail}
        value={email}
      />
      <ButtonRow>
        <TextButton onClick={toggleIsOpen} variant="light">
          {t('account.input.cancel')}
        </TextButton>
        <TextButton
          variant={isSavingDisabled ? 'disabled' : 'dark'}
          onClick={saveNewEmail}
        >
          {t('account.input.save')}
        </TextButton>
      </ButtonRow>
      <Text variant="blueBox">{t('account.emailInfo')}</Text>
    </Section>
  ) : (
    <Section>
      <SpacedRow>
        <Column>
          <Text variant="label">{t('account.email')}</Text>
          <Value>{emailValue}</Value>
        </Column>
        <IconButton
          variant="edit"
          sizeInPx={DEFAULT_ICON_SIZE.LARGE}
          onClick={toggleIsOpen}
        />
      </SpacedRow>
      <Text variant="blueBox">{t('account.emailInfo')}</Text>
    </Section>
  );
};

export default EmailEditor;

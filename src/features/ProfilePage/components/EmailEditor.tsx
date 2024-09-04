import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectUserInfo } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';

import { ButtonRow, Section, Value } from '.';
import { Column, SpacedRow } from '@/components/common';
import { DEFAULT_ICON_SIZE } from '@/components/variables';
import { IconButton, TextButton } from '@/components/Buttons';
import LabeledInput from '@/components/LabeledInput';
import Text from '@/components/Text';

const EmailEditor = () => {
  const { t } = useTranslation('profile');
  const userInfo = useAppSelector(selectUserInfo);

  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  const [email, setEmail] = useState<string>('');

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
        label={t('account.email')}
        onChange={setEmail}
        value={email}
      />
      <ButtonRow>
        <TextButton onClick={toggleIsOpen} variant="light">
          {t('account.input.cancel')}
        </TextButton>
        <TextButton onClick={saveNewEmail}>
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
          <Value>{email ?? t('account.emailMissing')}</Value>
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

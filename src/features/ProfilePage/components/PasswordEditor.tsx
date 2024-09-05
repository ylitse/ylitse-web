import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonRow, Section, Value } from '.';
import { Column, SpacedRow } from '@/components/common';
import { DEFAULT_ICON_SIZE, PASSWORD_MIN_LENGTH } from '@/components/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import PasswordInput from '@/components/PasswordInput';
import Text from '@/components/Text';

const PasswordEditor = () => {
  const { t } = useTranslation('profile');

  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatedNewPassword, setRepeatedNewPassword] = useState('');

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const [isCurrentPasswordInvalid, setIsCurrentPasswordInvalid] =
    useState(false);
  const isPasswordTooShort = newPassword.length < PASSWORD_MIN_LENGTH;
  const doPasswordsMatch = newPassword === repeatedNewPassword;

  const saveNewPassword = () => {
    console.log('API: Save new password');
    setIsCurrentPasswordInvalid(true);
  };

  return isOpen ? (
    <Section>
      <PasswordInput
        error={
          isCurrentPasswordInvalid ? t('account.input.password.invalid') : null
        }
        label={t('account.input.password.current')}
        onChange={setCurrentPassword}
        value={currentPassword}
      />
      <PasswordInput
        error={
          isPasswordTooShort ? t('account.input.password.tooShortError') : null
        }
        label={t('account.input.password.new')}
        onChange={setNewPassword}
        tooltip={t('account.input.password.tooltip')}
        value={newPassword}
      />
      <PasswordInput
        error={
          doPasswordsMatch ? t('account.input.password.dontMatchError') : null
        }
        label={t('account.input.password.repeat')}
        onChange={setRepeatedNewPassword}
        tooltip={t('account.input.password.tooltip')}
        value={repeatedNewPassword}
      />
      <ButtonRow>
        <TextButton onClick={toggleIsOpen} variant="light">
          {t('account.input.cancel')}
        </TextButton>
        <TextButton onClick={saveNewPassword}>
          {t('account.input.save')}
        </TextButton>
      </ButtonRow>
    </Section>
  ) : (
    <Section>
      <SpacedRow>
        <Column>
          <Text variant="label">{t('account.password')}</Text>
          <Value>{t('account.passwordPlaceholder')}</Value>
        </Column>
        <IconButton
          variant="edit"
          sizeInPx={DEFAULT_ICON_SIZE.LARGE}
          onClick={toggleIsOpen}
        />
      </SpacedRow>
    </Section>
  );
};

export default PasswordEditor;

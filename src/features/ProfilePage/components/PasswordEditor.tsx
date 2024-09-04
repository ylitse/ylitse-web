import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonRow, Section, Value } from '.';
import { Column, SpacedRow } from '@/components/common';
import { DEFAULT_ICON_SIZE } from '@/components/variables';
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

  const saveNewPassword = () => {
    console.log('API: Save new password');
  };

  return isOpen ? (
    <Section>
      <PasswordInput
        label={t('account.input.password.current')}
        onChange={setCurrentPassword}
        value={currentPassword}
      />
      <PasswordInput
        label={t('account.input.password.new')}
        onChange={setNewPassword}
        tooltip={t('account.input.password.tooltip')}
        value={newPassword}
      />
      <PasswordInput
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

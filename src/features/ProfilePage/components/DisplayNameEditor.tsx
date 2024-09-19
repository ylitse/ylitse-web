import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectUser } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';
import { useUpdateUserMutation } from '@/features/Authentication/authenticationApi';

import { ButtonRow, Section, Value } from '.';
import { Column, SpacedRow } from '@/components/common';
import {
  DEFAULT_ICON_SIZE,
  DISPLAY_NAME_MIN_LENGTH,
} from '@/components/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import LabeledInput from '@/components/LabeledInput';
import Text from '@/components/Text';

const DisplayNameEditor = () => {
  const { t } = useTranslation('profile');
  const user = useAppSelector(selectUser);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [displayName, setDisplayName] = useState(user.display_name);
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  const isTooShort = displayName.length < DISPLAY_NAME_MIN_LENGTH;
  const isSavingDisabled = isLoading || isTooShort;

  const saveDisplayName = async () => {
    try {
      await updateUser({ ...user, display_name: displayName }).unwrap();
      setIsOpen(false);
    } catch (err) {
      return;
    }
  };

  return isOpen ? (
    <Section>
      <LabeledInput
        error={isTooShort ? t('public.displayName.tooShortError') : null}
        label={t('public.displayName.label')}
        onChange={setDisplayName}
        tooltip={t('public.displayName.tooltip')}
        value={displayName}
      />
      <ButtonRow>
        <TextButton onClick={toggleIsOpen} variant="light">
          {t('account.cancel')}
        </TextButton>
        <TextButton
          onClick={saveDisplayName}
          variant={isSavingDisabled ? 'disabled' : 'dark'}
        >
          {t('account.save')}
        </TextButton>
      </ButtonRow>
      <Text variant="blueBox">{t('public.displayName.info')}</Text>
    </Section>
  ) : (
    <Section>
      <SpacedRow>
        <Column>
          <Text variant="label">{t('public.displayName.label')}</Text>
          <Value>{displayName}</Value>
        </Column>
        <IconButton
          onClick={toggleIsOpen}
          sizeInPx={DEFAULT_ICON_SIZE.LARGE}
          variant="edit"
        />
      </SpacedRow>
      <Text variant="blueBox">{t('public.displayName.info')}</Text>
    </Section>
  );
};

export default DisplayNameEditor;

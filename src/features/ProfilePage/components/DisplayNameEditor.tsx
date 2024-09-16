import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectUser } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';

import { ButtonRow, Section, Value } from '.';
import { Column, SpacedRow } from '@/components/common';
import {
  DEFAULT_ICON_SIZE,
  DISPLAY_NAME_MIN_LENGTH,
} from '@/components/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import LabeledInput from '@/components/LabeledInput';
import Text from '@/components/Text';
import { useUpdateUserMutation } from '../profilePageApi';

const DisplayNameEditor = () => {
  const { t } = useTranslation('profile');
  const user = useAppSelector(selectUser);

  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  const [displayName, setDisplayName] = useState('');

  const isTooShort = displayName.length < DISPLAY_NAME_MIN_LENGTH;

  useEffect(() => {
    setDisplayName(user.display_name);
  }, []);

  const [updateUser] = useUpdateUserMutation();

  const saveNewDisplayName = async () => {
    const { account_id, active, id, role } = user;
    await updateUser({
      account_id,
      active,
      display_name: displayName,
      id,
      role,
    });
    setIsOpen(false);
    // TODO: Show error notification
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
          onClick={saveNewDisplayName}
          variant={isTooShort ? 'disabled' : 'dark'}
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

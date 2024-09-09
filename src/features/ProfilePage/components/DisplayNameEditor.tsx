import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectUserInfo } from '@/features/Authentication/userSlice';
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

const DisplayNameEditor = () => {
  const { t } = useTranslation('profile');
  const userInfo = useAppSelector(selectUserInfo);

  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  const [displayName, setDisplayName] = useState('');

  const isTooShort = displayName.length < DISPLAY_NAME_MIN_LENGTH;

  useEffect(() => {
    setDisplayName(userInfo.displayName ?? '');
  }, [userInfo.displayName]);

  const saveNewDisplayName = () => {
    console.log('API: Save new display name');
  };

  return isOpen ? (
    <Section>
      <LabeledInput
        error={isTooShort ? t('public.mentee.displayName.tooShortError') : null}
        label={t('public.mentee.displayName.title')}
        onChange={setDisplayName}
        tooltip={t('public.mentee.displayName.tooltip')}
        value={displayName}
      />
      <ButtonRow>
        <TextButton onClick={toggleIsOpen} variant="light">
          {t('account.input.cancel')}
        </TextButton>
        <TextButton onClick={saveNewDisplayName}>
          {t('account.input.save')}
        </TextButton>
      </ButtonRow>
      <Text variant="blueBox">{t('public.mentee.displayName.info')}</Text>
    </Section>
  ) : (
    <Section>
      <SpacedRow>
        <Column>
          <Text variant="label">{t('public.mentee.displayName.title')}</Text>
          <Value>{displayName}</Value>
        </Column>
        <IconButton
          variant="edit"
          sizeInPx={DEFAULT_ICON_SIZE.LARGE}
          onClick={toggleIsOpen}
        />
      </SpacedRow>
      <Text variant="blueBox">{t('public.mentee.displayName.info')}</Text>
    </Section>
  );
};

export default DisplayNameEditor;

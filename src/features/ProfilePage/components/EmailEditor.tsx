import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectAccount, setAccount } from '@/features/Authentication/userSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { useUpdateAccountMutation } from '../profilePageApi';

import { ButtonRow, Section, Value } from '.';
import { Column, SpacedRow } from '@/components/common';
import { DEFAULT_ICON_SIZE, EMAIL_REGEX } from '@/components/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import LabeledInput from '@/components/LabeledInput';
import Text from '@/components/Text';

import type { Account } from '@/features/Authentication/authenticationApi';

const EmailEditor = () => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccount);
  const [updateAccount, { isError, isLoading, isSuccess }] =
    useUpdateAccountMutation();

  const [email, setEmail] = useState(account.email);
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  const isEmailMissing = !email.length;
  const emailValue = isEmailMissing ? t('account.email.missing') : email;
  const isEmailInvalid = email.length > 0 && !email.match(EMAIL_REGEX);
  const isSavingDisabled = isLoading || isEmailMissing || isEmailInvalid;

  const accountToSave: Account = {
    ...account,
    email,
  };

  useEffect(() => {
    if (isError) {
      // TODO: Show error notification
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAccount(accountToSave));
      setIsOpen(false);
      // TODO: Show success notification
    }
  }, [isSuccess]);

  const saveEmail = () => updateAccount(accountToSave);

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
          onClick={saveEmail}
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

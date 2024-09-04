import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, TextButton } from '@/components/Buttons';
import { palette } from '@/components/variables';
import PasswordInput from '@/components/PasswordInput';
import Text from '@/components/Text';

const PasswordEditor = () => {
  const { t } = useTranslation('profile');

  const [isPasswordEditorOpen, setIsPasswordEditorOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatedNewPassword, setRepeatedNewPassword] = useState('');

  const toggleIsPasswordEditorOpen = () =>
    setIsPasswordEditorOpen(!isPasswordEditorOpen);

  const updateCurrentPassword = (password: string) =>
    setCurrentPassword(password);

  const updateNewPassword = (password: string) => setNewPassword(password);

  const updateRepeatedNewPassword = (password: string) =>
    setRepeatedNewPassword(password);

  const saveNewPassword = () => {
    console.log('Save new password');
  };

  return isPasswordEditorOpen ? (
    <Section>
      <PasswordInput
        label={t('account.input.password.current')}
        onChange={updateCurrentPassword}
        value={currentPassword}
      />
      <PasswordInput
        label={t('account.input.password.new')}
        onChange={updateNewPassword}
        tooltip={t('account.input.password.tooltip')}
        value={newPassword}
      />
      <PasswordInput
        label={t('account.input.password.repeat')}
        onChange={updateRepeatedNewPassword}
        tooltip={t('account.input.password.tooltip')}
        value={repeatedNewPassword}
      />
      <ButtonRow>
        <TextButton onClick={toggleIsPasswordEditorOpen} variant="light">
          {t('account.input.cancel')}
        </TextButton>
        <TextButton onClick={saveNewPassword}>
          {t('account.input.save')}
        </TextButton>
      </ButtonRow>
    </Section>
  ) : (
    <Section>
      <Row>
        <Column>
          <Text variant="label">{t('account.password')}</Text>
          <Value>{t('account.passwordPlaceholder')}</Value>
        </Column>
        <IconButton
          variant="edit"
          sizeInPx={48}
          onClick={toggleIsPasswordEditorOpen}
        />
      </Row>
    </Section>
  );
};

const Section = styled.div`
  border-bottom: 1px solid ${palette.blueDark};
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const Value = styled(Text)`
  margin: 0.5rem 0 0 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export default PasswordEditor;

import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectUserInfo } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';

import AdminIcon from '@/static/icons/admin.svg';
import { IconButton, TextButton } from '@/components/Buttons';
import LabeledInput from '@/components/LabeledInput';
import MentorIcon from '@/static/icons/mentor.svg';
import { OUTER_VERTICAL_MARGIN, palette } from '@/components/variables';
import PasswordEditor from './PasswordEditor';
import Text from '@/components/Text';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';

import type { UserRole } from '@/features/Authentication/userSlice';

type Props = {
  userRole: UserRole;
};

const AccountInfo = ({ userRole }: Props) => {
  const { t } = useTranslation('profile');
  const userInfo = useAppSelector(selectUserInfo);

  const isMentor = userRole === 'mentor';

  const [isEmailEditorOpen, setIsEmailEditorOpen] = useState(false);
  const toggleIsEmailEditorOpen = () =>
    setIsEmailEditorOpen(!isEmailEditorOpen);
  const [email, setEmail] = useState<string>('');
  const updateEmail = (email: string) => setEmail(email);

  const saveNewEmail = () => {
    console.log('Save new email');
  };

  const [isDisplayNameEditorOpen, setIsDisplayNameEditorOpen] = useState(false);
  const toggleIsDisplayNameEditorOpen = () =>
    setIsDisplayNameEditorOpen(!isDisplayNameEditorOpen);
  const [displayName, setDisplayName] = useState('');
  const updateDisplayName = (displayName: string) =>
    setDisplayName(displayName);

  const saveNewDisplayName = () => {
    console.log('Save new dispaly name');
  };

  useEffect(() => {
    const { displayName, email } = userInfo;
    if (displayName !== null) setDisplayName(displayName);
    if (email !== null) setEmail(email);
  }, [userInfo]);

  const deleteAccount = () => {
    console.log('Delete account');
  };

  const userRoleIcons = {
    admin: <img src={AdminIcon} />,
    mentee: <ProfileIcon color="purpleDark" />,
    mentor: <img src={MentorIcon} />,
  };

  return (
    <Container isMentor={isMentor}>
      {!isMentor && (
        <MenteeHeader>
          <Text variant="h1">{t('title')}</Text>
        </MenteeHeader>
      )}
      <Text variant="h2">{t('account.title')}</Text>

      <Section>
        <Text variant="label">{t('account.roles.title')}</Text>
        <Role>
          {userRoleIcons[userRole]}
          <Text>{t(`account.roles.${userRole}`)}</Text>
        </Role>
      </Section>

      <Section>
        <Text variant="label">{t('account.username')}</Text>
        <Value>{userInfo.username}</Value>
      </Section>

      <PasswordEditor />

      {isEmailEditorOpen ? (
        <Section>
          <LabeledInput
            label={t('account.email')}
            onChange={updateEmail}
            value={email}
          />
          <ButtonRow>
            <TextButton onClick={toggleIsEmailEditorOpen} variant="light">
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
          <Row>
            <Column>
              <Text variant="label">{t('account.email')}</Text>
              <Value>{email}</Value>
            </Column>
            <IconButton
              variant="edit"
              sizeInPx={48}
              onClick={toggleIsEmailEditorOpen}
            />
          </Row>
          <Text variant="blueBox">{t('account.emailInfo')}</Text>
        </Section>
      )}

      {!isMentor && (
        <Public>
          <Text variant="h2">{t('public.title')}</Text>
          {isDisplayNameEditorOpen ? (
            <Section>
              <LabeledInput
                label={t('public.mentee.displayName')}
                onChange={updateDisplayName}
                value={displayName}
              />
              <ButtonRow>
                <TextButton
                  onClick={toggleIsDisplayNameEditorOpen}
                  variant="light"
                >
                  {t('account.input.cancel')}
                </TextButton>
                <TextButton onClick={saveNewDisplayName}>
                  {t('account.input.save')}
                </TextButton>
              </ButtonRow>
              <Text variant="blueBox">
                {t('public.mentee.displayNameInfo')}
              </Text>
            </Section>
          ) : (
            <Section>
              <Row>
                <Column>
                  <Text variant="label">{t('public.mentee.displayName')}</Text>
                  <Value>{displayName}</Value>
                </Column>
                <IconButton
                  variant="edit"
                  sizeInPx={48}
                  onClick={toggleIsDisplayNameEditorOpen}
                />
              </Row>
              <Text variant="blueBox">
                {t('public.mentee.displayNameInfo')}
              </Text>
            </Section>
          )}
        </Public>
      )}

      <DeleteButton variant="danger" onClick={deleteAccount}>
        {t('account.delete')}
      </DeleteButton>
    </Container>
  );
};

const Container = styled.div<{ isMentor: boolean }>`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: fit-content;
  padding: 3rem;

  ${({ isMentor }) =>
    !isMentor &&
    css`
      align-content: center;
      margin: ${OUTER_VERTICAL_MARGIN} auto;
      width: 50vw;
    `}
`;

const MenteeHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.div`
  border-bottom: 1px solid ${palette.blueDark};
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const Role = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
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

const Public = styled.div`
  margin-top: 2rem;
`;

const DeleteButton = styled(TextButton)`
  align-self: center;
  margin-top: 2rem;
`;

export default AccountInfo;

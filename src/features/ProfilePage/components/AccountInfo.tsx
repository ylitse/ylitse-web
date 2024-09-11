import styled, { css } from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectUserInfo } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';

import AdminIcon from '@/static/icons/admin.svg';
import Dialog from '@/components/Dialog';
import DisplayNameEditor from './DisplayNameEditor';
import EmailEditor from './EmailEditor';
import MentorIcon from '@/static/icons/mentor.svg';
import { OUTER_VERTICAL_MARGIN, palette } from '@/components/constants';
import PasswordEditor from './PasswordEditor';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import { Section, Value } from '.';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

import type { UserRole } from '@/features/Authentication/authenticationApi';

type Props = {
  userRole: UserRole;
};

const AccountInfo = ({ userRole }: Props) => {
  const { t } = useTranslation('profile');
  const { loginName } = useAppSelector(selectUserInfo);

  const isMentor = userRole === 'mentor';

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const openDeleteConfirmation = () => setIsDeleteConfirmationOpen(true);
  const closeDeleteConfirmation = () => setIsDeleteConfirmationOpen(false);

  const deleteAccount = () => {
    console.log('API: Delete account');
    closeDeleteConfirmation();
  };

  const userRoleIcons = {
    admin: <img src={AdminIcon} />,
    mentee: <ProfileIcon color="purpleDark" />,
    mentor: <img src={MentorIcon} />,
  };

  return (
    <Container isMentor={isMentor}>
      {isDeleteConfirmationOpen && (
        <Dialog
          borderColor={palette.redSalmon}
          closeText={t('account.delete.cancel')}
          confirmText={t('account.delete.confirm')}
          onClose={closeDeleteConfirmation}
          onConfirm={deleteAccount}
          description={t('account.delete.description')}
          title={t('account.delete.title')}
        />
      )}

      {!isMentor && (
        <MenteeHeader>
          <Text variant="h1">{t('title')}</Text>
        </MenteeHeader>
      )}

      <Text variant="h2">{t('account.title')}</Text>
      <Section>
        <Text variant="label">{t('account.role.title')}</Text>
        <Role>
          {userRoleIcons[userRole]}
          <Text>{t(`account.role.${userRole}`)}</Text>
        </Role>
      </Section>
      <Section>
        <Text variant="label">{t('account.loginName')}</Text>
        <Value>{loginName}</Value>
      </Section>
      <PasswordEditor />
      <EmailEditor />

      {!isMentor && (
        <Public>
          <Text variant="h2">{t('public.title')}</Text>
          <DisplayNameEditor />
        </Public>
      )}

      <DeleteButton variant="danger" onClick={openDeleteConfirmation}>
        {t('account.delete.title')}
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
      width: 670px;
    `}
`;

const MenteeHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Role = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Public = styled.div`
  margin-top: 2rem;
`;

const DeleteButton = styled(TextButton)`
  align-self: center;
  margin-top: 2rem;
`;

export default AccountInfo;

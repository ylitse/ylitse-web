import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import AdminIcon from '@/static/icons/admin.svg';

import { IconButton, TextButton } from '@/components/Buttons';
import MentorIcon from '@/static/icons/mentor.svg';
import { OUTER_VERTICAL_MARGIN, palette } from '@/components/variables';
import Text from '@/components/Text';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';

import type { UserRole } from '@/features/Authentication/userSlice';

type Props = {
  userRole: UserRole;
};

const AccountInfo = ({ userRole }: Props) => {
  const { t } = useTranslation('profile');
  const isMentor = userRole === 'mentor';

  const editPassword = () => {
    console.log('Edit password');
  };

  const editEmail = () => {
    console.log('Edit email');
  };

  const editDisplayName = () => {
    console.log('Edit display name');
  };

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
        <Value>Maija19283192</Value>
      </Section>

      <Section>
        <Row>
          <Column>
            <Text variant="label">{t('account.password')}</Text>
            <Value>{t('account.passwordPlaceholder')}</Value>
          </Column>
          <IconButton variant="edit" sizeInPx={48} onClick={editPassword} />
        </Row>
      </Section>

      <Section>
        <Row>
          <Column>
            <Text variant="label">{t('account.email')}</Text>
            <Value>maija1923983@gmail.com</Value>
          </Column>
          <IconButton variant="edit" sizeInPx={48} onClick={editEmail} />
        </Row>
        <Text variant="blueBox">{t('account.emailInfo')}</Text>
      </Section>

      {!isMentor && (
        <Public>
          <Text variant="h2">{t('public.title')}</Text>
          <Section>
            <Row>
              <Column>
                <Text variant="label">{t('public.mentee.displayName')}</Text>
                <Value>maija21</Value>
              </Column>
              <IconButton
                variant="edit"
                sizeInPx={48}
                onClick={editDisplayName}
              />
            </Row>
            <Text variant="blueBox">{t('public.mentee.displayNameInfo')}</Text>
          </Section>
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

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { IconButton, TextButton } from '@/components/Buttons';
import { palette } from '@/components/variables';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import Text from '@/components/Text';

import type { UserRole } from '@/features/Authentication/userSlice';

type Props = {
  role: UserRole;
};

const AccountInfo = ({ role }: Props) => {
  const { t } = useTranslation('profile');

  const editPassword = () => {
    console.log('Edit password');
  };

  const editEmail = () => {
    console.log('Edit email');
  };

  return (
    <Container>
      <Text variant="h2">{t('account.title')}</Text>
      <Section>
        <Text variant="label">{t('account.roles.title')}</Text>
        <RoleRow>
          <ProfileIcon color="purpleDark" />
          <Text>{t(`account.roles.${role}`)}</Text>
        </RoleRow>
      </Section>
      <Section>
        <Text variant="label">{t('account.username')}</Text>
        <Text>Maija19283192</Text>
      </Section>
      <Section>
        <Row>
          <Column>
            <Text variant="label">{t('account.password')}</Text>
            <Text>************</Text>
          </Column>
          <IconButton variant="edit" sizeInPx={48} onClick={editPassword} />
        </Row>
      </Section>
      <Section>
        <Row>
          <Column>
            <Text variant="label">{t('account.email')}</Text>
            <Text>maija1923983@gmail.com</Text>
          </Column>
          <IconButton variant="edit" sizeInPx={48} onClick={editEmail} />
        </Row>
        <Text variant="blueBox">{t('account.emailInfo')}</Text>
      </Section>
      <DeleteButton variant="danger">{t('account.delete')}</DeleteButton>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 3rem;
`;

const Section = styled.div`
  border-bottom: 1px solid ${palette.blueDark};
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  padding-top: 2rem;
`;

const RoleRow = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeleteButton = styled(TextButton)`
  align-self: center;
  margin-top: 2rem;
`;

export default AccountInfo;

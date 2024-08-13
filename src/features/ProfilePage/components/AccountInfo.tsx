import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { TextButton } from '@/components/Buttons';
import { palette } from '@/components/variables';
import Text from '@/components/Text';

import type { UserRole } from '@/features/Authentication/userSlice';

type Props = {
  role: UserRole;
};

const AccountInfo = ({ role }: Props) => {
  const { t } = useTranslation('profile');

  return (
    <Container>
      <Text variant="h2">{t('account.title')}</Text>
      <Section>
        <Text variant="label">{t('account.roles.title')}</Text>
        <Text>{t(`account.roles.${role}`)}</Text>
      </Section>
      <Section>
        <Text variant="label">{t('account.username')}</Text>
      </Section>
      <Section>
        <Text variant="label">{t('account.password')}</Text>
      </Section>
      <Section>
        <Text variant="label">{t('account.email')}</Text>
        <Text>{t('account.emailInfo')}</Text>
      </Section>
      <TextButton variant="danger">{t('account.delete')}</TextButton>
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
  gap: 1rem;
  padding: 2rem 2rem 2rem 0;
`;

export default AccountInfo;

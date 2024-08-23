import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { selectUserRole } from '../Authentication/userSlice';
import { useAppSelector } from '@/store';

import AccountInfo from './components/AccountInfo';
import {
  CONTENT_WIDTH,
  OUTER_VERTICAL_MARGIN,
  palette,
} from '@/components/variables';
import PageWithTransition from '@/components/PageWithTransition';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import PublicInfo from './components/PublicInfo';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const userRole = useAppSelector(selectUserRole);
  const showMentorProfile = userRole === 'mentor';

  return (
    <PageWithTransition>
      {showMentorProfile ? (
        <MentorContainer>
          <Header>
            <Title variant="h1">{t('title')}</Title>
          </Header>
          <Content>
            <AccountInfo role="mentor" />
            <PublicInfo />
          </Content>
        </MentorContainer>
      ) : (
        <MenteeContainer>
          <Title variant="h1">{t('title')}</Title>
          <Text variant="h2">{t('account.title')}</Text>
          <Section>
            <Text variant="label">{t('account.roles.title')}</Text>
            <SubSection>
              <ProfileIcon color="purpleDark" />
              <Text>
                {t(
                  `account.roles.${userRole === 'admin' ? 'admin' : 'mentee'}`,
                )}
              </Text>
            </SubSection>
          </Section>
          <Section>
            <Text variant="label">{t('account.username')}</Text>
            <Text>Maija19283192</Text>
          </Section>
          <Section>
            <Text variant="label">{t('account.password')}</Text>
            <Text>************</Text>
          </Section>
          <Section>
            <Text variant="label">{t('account.email')}</Text>
            <Text>maija1923983@gmail.com</Text>
            <Text variant="blueBox">{t('account.emailInfo')}</Text>
          </Section>
          <Section>
            <Text variant="h2">{t('public.title')}</Text>
            <Text variant="label">{t('public.displayName')}</Text>
            <Text>maija21</Text>
            <Text variant="blueBox">{t('public.mentee.displayNameInfo')}</Text>
          </Section>
          <DeleteButton variant="danger">{t('account.delete')}</DeleteButton>
        </MenteeContainer>
      )}
    </PageWithTransition>
  );
};

const MentorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: ${OUTER_VERTICAL_MARGIN} auto;
  max-width: ${CONTENT_WIDTH};
  width: ${CONTENT_WIDTH};
`;

const Header = styled.div`
  background-color: ${palette.blue2};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  height: 4rem;
  justify-content: center;
  width: ${CONTENT_WIDTH};
`;

const Title = styled(Text)`
  align-self: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

const MenteeContainer = styled.div`
  align-content: center;
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: ${OUTER_VERTICAL_MARGIN} auto;
  padding: 3rem;
  width: 50vw;
`;

// Duplicates
const Section = styled.div`
  border-bottom: 1px solid ${palette.blueDark};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 2rem 2rem 0;
`;

const SubSection = styled.div`
  display: flex;
  gap: 1rem;
`;

const DeleteButton = styled(TextButton)`
  align-self: center;
  margin-top: 2rem;
`;

export default ProfilePage;

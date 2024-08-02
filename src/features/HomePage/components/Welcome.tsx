import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

import type { UserRole } from '@/features/Authentication/userSlice';

type Props = {
  isMobile?: boolean;
  role: UserRole;
};

const Welcome = ({ isMobile = false, role }: Props) => {
  const { t } = useTranslation('home');

  const navigation = {
    admin: '/admin',
    mentor: '/chat',
    mentee: '/mentors',
  };

  const navigate = useNavigate();
  const navigateBasedOnRole = () => navigate(navigation[role]);

  return (
    <Container isDesktop={!isMobile}>
      <TextContainer>
        <Text variant="h2" color="white">
          {t(`welcome.${role}.title`)}
        </Text>
        <Text color="white">{t(`welcome.${role}.text`)}</Text>
        <Button variant="outline" onClick={navigateBasedOnRole}>
          {t(`welcome.${role}.button`)}
        </Button>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div<{ isDesktop: boolean }>`
  align-items: center;
  background-color: ${palette.purple};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ isDesktop }) => (isDesktop ? '4rem' : '3rem')};

  ${({ isDesktop }) =>
    isDesktop &&
    css`
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      min-height: 16rem;
    `}
`;

const TextContainer = styled.div`
  align-items: center;
  color: ${palette.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Button = styled(TextButton)`
  margin-top: 1rem;
`;

export default Welcome;

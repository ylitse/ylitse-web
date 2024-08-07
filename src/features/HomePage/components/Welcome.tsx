import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { selectUserRole } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';

import { palette } from '@/components/variables';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

type Props = {
  isMobile?: boolean;
};

const Welcome = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('home');
  const userRole = useAppSelector(selectUserRole);

  const navigation = {
    admin: '/admin',
    mentor: '/chat',
    mentee: '/mentors',
  };

  const navigate = useNavigate();
  const navigateBasedOnRole = () => {
    if (userRole) navigate(navigation[userRole]);
  };

  return (
    <Container isDesktop={!isMobile}>
      {userRole && (
        <TextContainer>
          <Text variant="h2" color="white">
            {t(`welcome.${userRole}.title`)}
          </Text>
          <Text color="white">{t(`welcome.${userRole}.text`)}</Text>
          <Button variant="outline" onClick={navigateBasedOnRole}>
            {t(`welcome.${userRole}.button`)}
          </Button>
        </TextContainer>
      )}
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

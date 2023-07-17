import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styled, { css } from 'styled-components';
import { palette } from '@/components/variables';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

const WelcomeWindow = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('chat');

  return (
    <div>
      <TopContainer>
        <WelcomeText isHeader variant="h2">
          {t('welcome.upper.title')}
        </WelcomeText>
        <WelcomeText>{t('welcome.upper.description')}</WelcomeText>
      </TopContainer>
      <BottomContainer>
        <WelcomeText isHeader variant="h2">
          {t('welcome.lower.title')}
        </WelcomeText>
        <WelcomeText>{t('welcome.lower.description')}</WelcomeText>
        <SearchButton onClick={() => navigate('/mentors')} size="large">
          {t('welcome.lower.button')}
        </SearchButton>
      </BottomContainer>
    </div>
  );
};

const TopContainer = styled.div`
  background-color: ${palette.white};
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  height: 50%;
  justify-content: center;
`;

const BottomContainer = styled.div`
  background-color: ${palette.blue2};
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  height: 50%;
  justify-content: center;
`;

const WelcomeText = styled(Text)<{ isHeader?: boolean }>`
  margin: 0;
  ${({ isHeader }) =>
    isHeader &&
    css`
      padding-bottom: 1rem;
    `}
  padding-left: 10%;
  padding-right: 10%;
`;

const SearchButton = styled(TextButton)`
  align-self: center;
  height: 48px;
  margin-top: 2rem;
  width: 272px;
`;

export default WelcomeWindow;

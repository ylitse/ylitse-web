import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import Text from '@/components/Text';

const PublicInfo = () => {
  const { t } = useTranslation('profile');

  return (
    <Container>
      <Text variant="h2">{t('public.title')}</Text>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex: 2;
  padding: 3rem;
`;

export default PublicInfo;

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/Text/Text';

export const Story = ({ story }: { story: string }) => {
  const { t } = useTranslation('mentors');
  return (
    <>
      <Text variant="h3">{t('card.bio')}</Text>
      <TruncatedMultiline>{story}</TruncatedMultiline>
    </>
  );
};

const TruncatedMultiline = styled(Text)`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  height: 6rem;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export default Story;

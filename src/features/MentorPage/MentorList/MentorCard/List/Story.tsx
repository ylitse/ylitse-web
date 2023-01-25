import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import { Text } from '@/components/Text/Text';

export const Story = ({ story }: { story: string }) => {
  const { t } = useTranslation('mentors');
  return (
    <>
      <Text variant="h3">{t('card.bio')}</Text>
      <TruncatedMultiline variant="p">{story}</TruncatedMultiline>
    </>
  );
};

const TruncatedMultiline = styled(Text)`
  color: ${palette.darkblue};
  width: 100%;
  height: 6rem;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

export default Story;

import styled from 'styled-components';
import { TextButton } from '@/components/Buttons';
import { Mentor } from '../../../mentorPageApi';

import { useTranslation } from 'react-i18next';

type Props = {
  setVisibleCard: (mentor: Mentor) => void;
  mentor: Mentor;
};

export const ExpandButton = ({ setVisibleCard, mentor }: Props) => {
  const { t } = useTranslation();
  return (
    <Container>
      <TextButton onClick={() => setVisibleCard(mentor)}>
        {t('mentorPage.card.open')}
      </TextButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  z-index: 2;
`;

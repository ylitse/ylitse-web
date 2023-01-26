import styled from 'styled-components';
import { Text } from '@/components/Text/Text';
import { Skills } from './Skills';
import { TextButton } from '@/components/Buttons';
import { Mentor } from '@/features/MentorPage/mentorPageApi';
import { Languages } from './Languages';
import { breakpoints } from '@/components/variables';

import { useMobileMode } from '@/hooks/useMobileMode';
import { useTranslation } from 'react-i18next';

type Props = {
  mentor: Mentor;
};

export const Content = ({ mentor: { skills, story, languages } }: Props) => {
  const isMobile = useMobileMode();
  const { t } = useTranslation('mentors');

  const handleClick = () => {
    console.log('open conversation');
  };

  return (
    <Container>
      <Text variant="h3">{t('card.bio')}</Text>
      <Text variant="p">{story}</Text>
      {isMobile && <Languages languages={languages} isMobile={isMobile} />}
      <Skills skills={skills} />
      <OpenConversationButton onClick={handleClick}>
        {t('card.chat')}
      </OpenConversationButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 2rem;
`;

const OpenConversationButton = styled(TextButton)`
  align-self: center;
  bottom: 0;
  margin-top: auto;

  @media screen and (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem 3rem;
  }
`;

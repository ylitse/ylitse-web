import type { Mentor } from '@/features/MentorPage/mentorPageApi';

import { useMobileMode } from '@/hooks/useMobileMode';
import { useTranslation } from 'react-i18next';

import styled, { css } from 'styled-components';
import { Text } from '@/components/Text/Text';
import { Skills } from './Skills';
import { TextButton } from '@/components/Buttons';
import { Languages } from './Languages';
import { IconButton } from '@/components/Buttons';
import { breakpoints } from '@/components/variables';

type Props = {
  mentor: Mentor;
  onDismiss: () => void;
};

export const Content = ({
  mentor: { skills, story, languages },
  onDismiss,
}: Props) => {
  const isMobile = useMobileMode();
  const { t } = useTranslation('mentors');

  const handleClick = () => {
    console.log('open conversation');
  };

  return (
    <Container>
      <HeaderContainer>
        <StoryHeader isMobile={isMobile} variant="h3">
          {t('card.bio')}
        </StoryHeader>
        {!isMobile && (
          <IconButton onClick={onDismiss} variant="close" sizeInPx={38} />
        )}
      </HeaderContainer>
      <Text>{story}</Text>
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
  overflow-y: auto;
  padding: 2rem;
`;

const HeaderContainer = styled.div`
  display: flex;
`;

const StoryHeader = styled(Text)<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    !isMobile &&
    css`
      flex-grow: 1;
    `};
`;

const OpenConversationButton = styled(TextButton)`
  align-self: center;
  bottom: 0;
  margin-top: auto;

  @media screen and (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem 3rem;
  }
`;

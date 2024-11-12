import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import type { Mentor } from '@/features/MentorPage/models';

import { selectUserId } from '@/features/Authentication/selectors';
import { setConversation } from '@/features/Chat/chatSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { breakpoints, ICON_SIZES } from '@/components/constants';
import { IconButton } from '@/components/Buttons';
import { Languages } from './Languages';
import { Skills } from './Skills';
import { Text } from '@/components/Text/Text';
import { TextButton } from '@/components/Buttons';

type Props = {
  mentor: Mentor;
  isMe: boolean;
  onDismiss: () => void;
};

export const Content = ({
  mentor: { skills, story, languages, buddyId, name },
  onDismiss,
}: Props) => {
  const { isMobile } = useGetLayoutMode();
  const { t } = useTranslation('mentors');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUserId = useAppSelector(selectUserId);
  const isMe = currentUserId === buddyId;

  const handleClick = () => {
    dispatch(setConversation({ name, buddyId }));
    navigate('/chat');
  };

  const areLanguagesDisplayed = isMobile && languages.length > 0;

  return (
    <Container isMobile={isMobile}>
      {!isMobile && (
        <CloseButton
          onClick={onDismiss}
          variant="closeWithBackground"
          sizeInPx={ICON_SIZES.MEDIUM}
        />
      )}
      <div>
        <Text variant="h3">{t('card.bio')}</Text>
        <Text>{story}</Text>
      </div>
      {areLanguagesDisplayed && (
        <Languages isMe={isMe} isMobile={isMobile} languages={languages} />
      )}
      <Skills skills={skills} />
      <OpenConversationButton
        isDisabled={isMe}
        onClick={handleClick}
        size="large"
        variant={isMe ? 'disabled' : 'dark'}
      >
        {t('card.chat')}
      </OpenConversationButton>
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  padding: ${({ isMobile }) => (isMobile ? '1rem 1.25rem' : '4rem 5rem')};
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

const OpenConversationButton = styled(TextButton)`
  align-self: center;
  bottom: 0;
  margin-top: auto;

  @media screen and (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem 3rem;
  }
`;

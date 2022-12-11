import styled, { css } from 'styled-components';
import { Text } from '../../../../../components/Text/Text';
import { Skills } from './Skills';
import { TextButton } from '../../../../../components/Buttons';
import { Mentor } from '../../../mentorPageApi';
import { Languages } from './Languages';
import { useMobileMode } from '@/hooks/useMobileMode';

type Props = {
  mentor: Mentor;
};

export const Content = ({ mentor: { skills, story, languages } }: Props) => {
  const isMobile = useMobileMode();

  const handleClick = () => {
    console.log('open conversation');
  };

  return (
    <Container>
      <Text variant="h3">Tarinani</Text>
      <Text variant="p">{story}</Text>
      {isMobile && <Languages languages={languages} isMobile={isMobile} />}
      <Skills skills={skills} />
      <OpenConversationButton onClick={handleClick} isMobile={isMobile}>
        Avaa keskustelu
      </OpenConversationButton>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const OpenConversationButton = styled(TextButton)<{ isMobile: boolean }>`
  bottom: 0;
  margin-top: auto;
  align-self: center;
  ${({ isMobile }) =>
    isMobile &&
    css`
      padding: 0.75rem 3rem;
    `}
`;

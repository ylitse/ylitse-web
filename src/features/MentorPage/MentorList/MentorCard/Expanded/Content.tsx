import styled from 'styled-components';
import { Text } from '../../../../../components/Text/Text';
import { Skills } from './Skills';
import { TextButton } from '../../../../../components/Buttons';
import { Mentor } from '../../../mentorPageApi';
import { Languages } from './Languages';
import { useMobileMode } from '@/hooks/useMobileMode';
import { breakpoints } from '@/components/variables';

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
      <OpenConversationButton onClick={handleClick}>
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

const OpenConversationButton = styled(TextButton)`
  bottom: 0;
  margin-top: auto;
  align-self: center;

  @media screen and (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem 3rem;
  }
`;

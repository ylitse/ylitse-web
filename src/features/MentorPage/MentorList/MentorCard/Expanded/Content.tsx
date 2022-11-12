import styled from 'styled-components';
import { Text } from '../../../../../components/Text/Text';
import { Skills } from './Skills';
import { TextButton } from '../../../../../components/Buttons';
import CSS from 'csstype';
import { Mentor } from '../../../mentorPageApi';

type Props = {
  mentor: Mentor;
};

const customStylus: CSS.Properties = {
  position: 'relative',
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: 0,
  marginTop: 'auto',
  justifySelf: 'flex-end',
};

export const Content = ({ mentor: { skills, story } }: Props) => {
  const handleClick = () => {
    console.log('open conversation');
  };
  return (
    <Container>
      <StyledContent>
        <Text variant="h3" style={{ margin: 0 }}>
          Tarinani
        </Text>
        <Text variant="p">{story}</Text>
        <Skills skills={skills} />
        <TextButton onClick={handleClick} style={customStylus}>
          Avaa keskustelu
        </TextButton>
      </StyledContent>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: 0;
  margin: 3.15vw;
  padding-right: 0.5rem;
  min-width: 37.7vw;
  min-height: 57vh;
  max-height: 90vh;
  margin-bottom: 3.15vw;
  flex: 0 0 37.7vw;
  overflow: auto;
  box-sizing: border-box;
`;
const StyledContent = styled.div`
  position: relative;
  width: auto;
  min-height: 57vh;
  height: fit-content;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

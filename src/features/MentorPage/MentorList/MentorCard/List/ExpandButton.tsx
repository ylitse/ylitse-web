import { TextButton } from '../../../../../components/Buttons';
import { Mentor } from '../../../mentorPageApi';

import styled from 'styled-components';

type Props = {
  setVisibleCard: (mentor: Mentor) => void;
  mentor: Mentor;
};

export const ExpandButton = ({ setVisibleCard, mentor }: Props) => (
  <Container>
    <TextButton onClick={() => setVisibleCard(mentor)}>Avaa kortti</TextButton>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  z-index: 2;
`;

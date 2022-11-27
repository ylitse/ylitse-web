import { TextButton } from '../../../../../components/Buttons';
import { Mentor } from '../../../mentorPageApi';

import styled from 'styled-components';

type Props = {
  setVisibleCard: (mentor: Mentor) => void;
  mentor: Mentor;
};

export const ExpandButton = ({ setVisibleCard, mentor }: Props) => (
  <StyledButton onClick={() => setVisibleCard(mentor)}>
    Avaa kortti
  </StyledButton>
);

const StyledButton = styled(TextButton)`
  bottom: 0;
  margintop: 1.5rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

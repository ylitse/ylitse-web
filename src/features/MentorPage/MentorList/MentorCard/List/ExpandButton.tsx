import { TextButton } from '../../../../../components/Buttons';
import CSS from 'csstype';
import { Mentor } from '../../../mentorPageApi';

type Props = {
  setVisibleCard: (mentor: Mentor) => void;
  mentor: Mentor;
};

const customStylus: CSS.Properties = {
  bottom: '0',
  marginTop: '1.5rem',
};

export const ExpandButton = ({ setVisibleCard, mentor }: Props) => (
  <TextButton onClick={() => setVisibleCard(mentor)} style={customStylus}>
    Avaa kortti
  </TextButton>
);

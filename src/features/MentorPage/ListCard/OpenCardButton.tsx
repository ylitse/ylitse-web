import { TextButton } from '../../../components/Buttons';
import { handleSetVisibleCardProps } from '../MentorPage';
import { ListCardProps } from './types';
import CSS from 'csstype';

type Props = {
  setVisibleCard: ({
    shouldShowMentorCard,
    mentorCardData,
  }: handleSetVisibleCardProps) => void;
  mentorCardData: ListCardProps;
};

const customStylus: CSS.Properties = {
  bottom: '0',
  marginTop: '1.5rem',
};

const OpenCardButton = ({ setVisibleCard, mentorCardData }: Props) => {
  const handleClick = () => {
    setVisibleCard({ shouldShowMentorCard: true, mentorCardData });
  };

  return (
    <TextButton onClick={handleClick} style={customStylus}>
      Avaa kortti
    </TextButton>
  );
};

export default OpenCardButton;

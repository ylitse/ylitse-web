import styled from 'styled-components';
import * as cssVariables from '../../../components/CommonTextStyles/variables';
import { handleSetVisibleCardProps } from '../MentorPage';
import { ListCardProps } from './types';

type Props = {
  setVisibleCard: ({
    shouldShowMentorCard,
    mentorCardData,
  }: handleSetVisibleCardProps) => void;
  mentorCardData: ListCardProps;
};

const OpenCardButton = ({ setVisibleCard, mentorCardData }: Props) => {
  const handleClick = () => {
    const shouldShowMentorCard = true;
    setVisibleCard({ shouldShowMentorCard, mentorCardData });
  };

  return (
    <StyledOpenCardButton onClick={handleClick}>
      Avaa kortti
    </StyledOpenCardButton>
  );
};

const StyledOpenCardButton = styled.button`
  font-family: 'Baloo 2', cursive;
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  background-color: ${cssVariables.palette.purple};
  color: ${cssVariables.palette.orange};
  line-height: 150%;
  padding: ${cssVariables.spacing.small_button_padding};
  border-radius: 1.25rem;
  position: relative;
  left: 50%;
  margin-top: 1rem;
  transform: translateX(-50%);
`;

export default OpenCardButton;

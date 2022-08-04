import styled from 'styled-components';
import { ListCardProps } from '../../../../../mentor_card/src/features/MentorPage/ListCard/types';
import * as cssVariables from '../../../components/CommonTextStyles/variables';
import { Text } from '../../../components/CommonTextStyles/Text';
import MentorCardSkills from './MentorCardSkills';

type Props = {
  mentorCardData: ListCardProps;
};

const MentorCardContent = ({ mentorCardData }: Props) => {
  const handleClick = () => {
    console.log('open conversation');
  };
  return (
    <MentorContent>
      <Text variant="h3" style={{ margin: 0 }}>
        Tarinani
      </Text>
      <Text variant="p">{mentorCardData.mentor.story}</Text>
      <MentorCardSkills mentorCardData={mentorCardData} />
      <StartConversationButton onClick={handleClick}>
        Avaa keskustelu
      </StartConversationButton>
    </MentorContent>
  );
};

const StartConversationButton = styled.button`
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
  position: absolute;
  left: 50%;
  bottom: 3.15vw;
  transform: translateX(-50%);
`;

const MentorContent = styled.div`
  position: absolute;
  left: 21vw;
  top: 0;
  padding: 3.15vw;
  width: 44vw;
  min-height: 57vh;
  height: 100%;
  flex: 0 0 37.7vw;
  box-sizing: border-box;
`;

export default MentorCardContent;

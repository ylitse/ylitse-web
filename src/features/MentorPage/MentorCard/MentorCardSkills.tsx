import styled from 'styled-components';
import { ListCardProps } from '../../../../../mentor_card/src/features/MentorPage/ListCard/types';
import { Text } from '../../../components/CommonTextStyles/Text';
import { SimpleChip } from '../../../components/Chip';

type Props = {
  mentorCardData: ListCardProps;
};

const MentorCardSkills = ({ mentorCardData }: Props) => {
  if (mentorCardData !== undefined) {
    return (
      <Skills>
        <Text variant="h3" style={{ margin: '3rem 0 0 0' }}>
          Voin auttaa myös näissä
        </Text>
        <SkillChips>
          {mentorCardData.mentor.skills.map(item => (
            <SimpleChip key={item.text} text={item.text} />
          ))}
        </SkillChips>
      </Skills>
    );
  }
  return <></>;
};

const Skills = styled.div`
  height: fit-content;
`;

const SkillChips = styled.div`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  position: relative;
  height: fit-content;
  margin-bottom: 5vw;
  margin-top: 1em;
`;

export default MentorCardSkills;

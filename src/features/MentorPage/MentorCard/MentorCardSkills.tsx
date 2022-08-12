import styled from 'styled-components';
import { Text } from '../../../components/CommonTextStyles/Text';
import { SimpleChip } from '../../../components/Chip';
import { Mentor } from '../mentorPageApi';
import { alphabetize } from '@/functions/alphabetize';

type Props = {
  mentorCardData: Mentor;
};

const MentorCardSkills = ({ mentorCardData }: Props) => {
  const locale = 'fi';
  const sortedSkills = alphabetize({ data: mentorCardData.skills, locale });
  return (
    <Skills>
      <Text variant="h3" style={{ margin: '3rem 0 0 0' }}>
        Voin auttaa myös näissä
      </Text>
      <SkillChips>
        {sortedSkills.map(item => (
          <SimpleChip key={item} text={item} />
        ))}
      </SkillChips>
    </Skills>
  );
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

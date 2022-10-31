import styled from 'styled-components';
import { Text } from '../../../components/Text/Text';
import { SimpleChip } from '../../../components/Chip';

type Props = {
  skills: Array<string>;
};

const MentorCardSkills = ({ skills }: Props) => {
  return (
    <Skills>
      <Text variant="h3" style={{ margin: '3rem 0 0 0' }}>
        Voin auttaa myös näissä
      </Text>
      <SkillChips>
        {skills.map(skill => (
          <SimpleChip key={skill} text={skill} />
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

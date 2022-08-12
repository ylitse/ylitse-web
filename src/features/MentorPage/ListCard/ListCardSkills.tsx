import { alphabetize } from '../../../functions/alphabetize';
import styled from 'styled-components';
import { SimpleChip } from '../../../components/Chip';
import { Text } from '../../../components/CommonTextStyles/Text';
import * as cssVariables from '../../../components/variables';

const ListCardSkills = ({ skills }: { skills: Array<string> }) => {
  const locale = 'fi';
  const sortedSkills = alphabetize({ data: skills, locale });
  return (
    <Skills>
      <Text variant="h3" style={{ margin: '1.5rem 0 0 0' }}>
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
  max-height: 8.6rem;
`;

const SkillChips = styled.div`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  position: relative;
  height: 6rem;
  &:after {
    width: 100%;
    height: 2.5rem;
    content: '';
    display: block;
    position: absolute;
    top: 3.5rem;
    background: linear-gradient(transparent, ${cssVariables.palette.white});
  }
`;

export default ListCardSkills;

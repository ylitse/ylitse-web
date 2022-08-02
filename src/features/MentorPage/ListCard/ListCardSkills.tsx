import styled from 'styled-components';
import * as cssVariables from '../../../static/styles/variables';
import { SimpleChip } from '../../../components/Chip';
import { ChipProps } from '@/components/Chip/types';

const ListCardSkills = ({ skills }: { skills: Array<ChipProps> }) => {
  return (
    <Skills>
      <cssVariables.heading3_dark style={{ margin: '1.5rem 0 0 0' }}>
        Voin auttaa myös näissä
      </cssVariables.heading3_dark>
      <SkillChips>
        {skills.map(item => (
          <SimpleChip key={item.text} text={item.text} />
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
  height: 7rem;
  &:after {
    width: 100%;
    height: 2.5rem;
    content: '';
    display: block;
    position: absolute;
    top: 4.5rem;
    background: linear-gradient(transparent, white);
  }
`;

export default ListCardSkills;

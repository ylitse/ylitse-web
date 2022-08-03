import styled from 'styled-components';
import * as cssVariables from '../../../components/variables';
import { SimpleChip } from '../../../components/Chip';

const ListCardLanguages = ({ languages }: { languages: Array<string> }) => {
  return (
    <Languages>
      <cssVariables.heading3_dark style={{ margin: '1.5rem 0 0 0' }}>
        Puhun näitä kieliä
      </cssVariables.heading3_dark>
      <SkillChips>
        {languages.map(item => (
          <SimpleChip key={item} text={item} />
        ))}
      </SkillChips>
    </Languages>
  );
};

const Languages = styled.div``;

const SkillChips = styled.div`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  position: relative;
  height: fit-content;
  max-height: 7rem;
`;

export default ListCardLanguages;

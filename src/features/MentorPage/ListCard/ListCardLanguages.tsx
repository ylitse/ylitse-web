import { alphabetize } from '@/functions/alphabetize';
import styled from 'styled-components';
import { SimpleChip } from '../../../components/Chip';
import { Text } from '../../../components/CommonTextStyles/Text';

const ListCardLanguages = ({ languages }: { languages: Array<string> }) => {
  const locale = 'fi';
  const sortedLanguages = alphabetize({ data: languages, locale });
  return (
    <Languages>
      <Text variant="h3" style={{ margin: '1.5rem 0 0 0' }}>
        Puhun näitä kieliä
      </Text>
      <SkillChips>
        {sortedLanguages.map(item => (
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
  height: 3rem;
`;

export default ListCardLanguages;

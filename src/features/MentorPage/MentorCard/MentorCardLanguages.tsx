import { alphabetize } from '@/functions/alphabetize';
import styled from 'styled-components';
import { SimpleChip } from '../../../components/Chip';
import { Text } from '../../../components/CommonTextStyles/Text';

const MentorCardLanguages = ({ languages }: { languages: Array<string> }) => {
  const locale = 'fi';
  const sortedLanguages = alphabetize({ data: languages, locale });

  return (
    <Languages>
      <Text
        color="white"
        variant="p"
        style={{ margin: '3rem 0 0 0', textAlign: 'center' }}
      >
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
  justify-content: center;
  position: relative;
  height: fit-content;
  height: 7rem;
  min-height: 7rem;
  margin-top: 0.5rem;
`;

export default MentorCardLanguages;

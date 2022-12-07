import styled from 'styled-components';
import { SimpleChip } from '../../../../../components/Chip';
import { Text } from '../../../../../components/Text/Text';

export const Languages = ({ languages }: { languages: Array<string> }) => {
  return (
    <>
      <StyledText variant="h3">Puhun näitä kieliä</StyledText>
      <SkillChips>
        {languages.map(item => (
          <SimpleChip key={item} text={item} />
        ))}
      </SkillChips>
    </>
  );
};

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

export const StyledText = styled(Text)`
  margin: 1.5rem 0 0 0;
  textalign: center;
`;

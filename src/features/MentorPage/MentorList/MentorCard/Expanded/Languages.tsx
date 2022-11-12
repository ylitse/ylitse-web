import styled from 'styled-components';
import { SimpleChip } from '../../../../../components/Chip';
import { Text } from '../../../../../components/Text/Text';

export const Languages = ({ languages }: { languages: Array<string> }) => {
  return (
    <>
      <Text
        color="white"
        variant="p"
        style={{ margin: '3rem 0 0 0', textAlign: 'center' }}
      >
        Puhun näitä kieliä
      </Text>
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
  justify-content: center;
  position: relative;
  height: fit-content;
  max-height: 7rem;
  margin-top: 0.5rem;
`;

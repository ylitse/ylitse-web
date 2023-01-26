import styled from 'styled-components';
import { SimpleChip } from '@/components/Chip';
import { Text } from '@/components/Text/Text';
import { useTranslation } from 'react-i18next';

export const Languages = ({ languages }: { languages: Array<string> }) => {
  const { t } = useTranslation('mentors');
  return (
    <>
      <Header variant="h3">{t('card.languages')}</Header>
      <SkillChips>
        {languages.map(item => (
          <SimpleChip key={item} text={item} />
        ))}
      </SkillChips>
    </>
  );
};

const Header = styled(Text)`
  margin: 1.5rem 0 0 0;
  text-align: center;
`;

const SkillChips = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  height: fit-content;
  justify-content: flex-start;
  max-height: 7rem;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

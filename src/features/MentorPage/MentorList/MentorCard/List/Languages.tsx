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

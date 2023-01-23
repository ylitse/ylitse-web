import styled from 'styled-components';
import { SimpleChip } from '@/components/Chip';
import { StyledText } from './Languages';
import { palette } from '@/components/variables';

import { useTranslation } from 'react-i18next';

export const Skills = ({ skills }: { skills: Array<string> }) => {
  const { t } = useTranslation('mentors');
  return (
    <Container>
      <StyledText variant="h3">{t('card.skills')}</StyledText>
      <SkillChips>
        {skills.map(item => (
          <SimpleChip key={item} text={item} />
        ))}
      </SkillChips>
    </Container>
  );
};

const Container = styled.div`
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
    background: linear-gradient(transparent, ${palette.white});
  }
`;

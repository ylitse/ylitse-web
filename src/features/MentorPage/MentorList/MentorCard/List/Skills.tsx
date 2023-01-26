import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { SimpleChip } from '@/components/Chip';
import { palette } from '@/components/variables';
import Text from '@/components/Text';

export const Skills = ({ skills }: { skills: Array<string> }) => {
  const { t } = useTranslation('mentors');
  return (
    <Container>
      <Header variant="h3">{t('card.skills')}</Header>
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

export const Header = styled(Text)`
  margin: 1.5rem 0 0 0;
  text-align: center;
`;

const SkillChips = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  height: 6rem;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  width: 100%;
  &:after {
    background: linear-gradient(transparent, ${palette.white});
    content: '';
    display: block;
    height: 2.5rem;
    position: absolute;
    top: 3.5rem;
    width: 100%;
  }
`;

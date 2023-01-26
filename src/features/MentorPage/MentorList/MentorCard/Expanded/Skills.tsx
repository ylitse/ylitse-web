import styled from 'styled-components';
import { Text } from '@/components/Text/Text';
import { SimpleChip } from '@/components/Chip';

import { useTranslation } from 'react-i18next';

type Props = {
  skills: Array<string>;
};

export const Skills = ({ skills }: Props) => {
  const { t } = useTranslation('mentors');
  return (
    <Container>
      <Header variant="h3">{t('card.skills')}</Header>
      <SkillChips>
        {skills.map(skill => (
          <SimpleChip key={skill} text={skill} />
        ))}
      </SkillChips>
    </Container>
  );
};

const Container = styled.div`
  height: fit-content;
`;

const SkillChips = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  height: fit-content;
  justify-content: flex-start;
  margin-bottom: 5vw;
  margin-top: 1em;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const Header = styled(Text)`
  margin: 3rem 0 0 0;
`;

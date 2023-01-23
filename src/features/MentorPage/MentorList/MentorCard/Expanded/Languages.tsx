import styled from 'styled-components';
import { SimpleChip } from '@/components/Chip';
import { Text } from '@/components/Text/Text';
import { breakpoints } from '@/components/variables';

import { useTranslation } from 'react-i18next';

export const Languages = ({
  languages,
  isMobile,
}: {
  languages: Array<string>;
  isMobile: boolean;
}) => {
  const { t } = useTranslation('mentors');
  return (
    <>
      <StyledText variant="h3" color={isMobile ? 'darkpurple' : 'white'}>
        {t('card.languages')}
      </StyledText>
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
  position: relative;
  height: fit-content;
  max-height: 7rem;
  margin-top: 0.5rem;
  justify-content: center;

  @media screen and (max-width: ${breakpoints.mobile}) {
    justify-content: flex-start;
  }
`;

const StyledText = styled(Text)`
  margin: 3rem 0 0 0;
  textalign: center;
`;

import styled, { css } from 'styled-components';
import { SimpleChip } from '../../../../../components/Chip';
import { Text } from '../../../../../components/Text/Text';

export const Languages = ({
  languages,
  isMobile,
}: {
  languages: Array<string>;
  isMobile: boolean;
}) => {
  return (
    <>
      <StyledText variant="h3" color={isMobile ? 'darkpurple' : 'white'}>
        Puhun näitä kieliä
      </StyledText>
      <SkillChips isMobile={isMobile}>
        {languages.map(item => (
          <SimpleChip key={item} text={item} />
        ))}
      </SkillChips>
    </>
  );
};

const SkillChips = styled.div<{ isMobile: boolean }>`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  height: fit-content;
  max-height: 7rem;
  margin-top: 0.5rem;
  ${({ isMobile }) =>
    !isMobile &&
    css`
      justify-content: center;
    `}
`;

const StyledText = styled(Text)`
  margin: 3rem 0 0 0;
  textalign: center;
`;

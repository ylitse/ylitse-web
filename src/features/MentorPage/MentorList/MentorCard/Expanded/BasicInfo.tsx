import styled, { css } from 'styled-components';
import { Text } from '../../../../../components/Text/Text';
import { Languages } from './Languages';
import { Mentor } from '../../../mentorPageApi';
import * as cssVariables from '../../../../../components/variables';
import { useMobileMode } from '@/hooks/useMobileMode';

type Props = {
  mentor: Mentor;
};

export const BasicInfo = ({
  mentor: { name, age, region, isVacationing, statusMessage, languages },
}: Props) => {
  const isMobile = useMobileMode();

  return (
    <Container isMobile={isMobile}>
      <Text color="white" variant={isMobile ? 'h1' : 'h2'}>
        {name}
      </Text>
      {!isMobile && <NameDivider />}
      <WrappedText color="white" variant="p">
        {age} v. <StyledDivider>|</StyledDivider> {region}
      </WrappedText>
      <Text color="white" variant="p">
        {!isVacationing}
      </Text>
      <TruncateText>{statusMessage}</TruncateText>
      {!isMobile && <Languages languages={languages} isMobile={isMobile} />}
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  max-width: 70%;
  box-sizing: border-box;
  margin: 0 auto;
  ${({ isMobile }) =>
    isMobile
      ? css`
          align-items: flex-start;
          justify-content: center;
        `
      : css`
          align-items: center;
        `}
`;

const NameDivider = styled.div`
  width: 16vw;
  height: 2px;
  border-bottom: 1px solid ${cssVariables.palette.white};
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
`;

const StyledDivider = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const WrappedText = styled(Text)`
  margin: 0px;
  display: flex;
  flexwrap: wrap;
`;

export const TruncateText = styled(Text)`
  textoverflow: ellipsis;
  whitespace: nowrap;
  overflow: hidden;
  margin: 0px;
  width: 100%;
  fontfamily: 'Source Sans Pro';
  fontstyle: normal;
  fontweight: 400;
  fontsize: 1rem;
  lineheight: 1.5rem;
  color: ${cssVariables.palette.white};
  textalign: center;
`;

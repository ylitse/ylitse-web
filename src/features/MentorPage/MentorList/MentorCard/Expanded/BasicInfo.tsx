import styled from 'styled-components';
import { Text } from '@/components/Text/Text';
import { Languages } from './Languages';
import { Mentor } from '@/features/MentorPage/mentorPageApi';
import { breakpoints, palette } from '@/components/variables';
import { useMobileMode } from '@/hooks/useMobileMode';
import { useTranslation } from 'react-i18next';

type Props = {
  mentor: Mentor;
};

export const BasicInfo = ({
  mentor: { name, age, region, isVacationing, statusMessage, languages },
}: Props) => {
  const isMobile = useMobileMode();
  const { t } = useTranslation();

  return (
    <Container>
      <Text color="white" variant={isMobile ? 'h1' : 'h2'}>
        {name}
      </Text>
      {!isMobile && <NameDivider />}
      <WrappedText color="white" variant="p">
        {age} {t('mentorPage.card.age')} <StyledDivider>|</StyledDivider>
        {region}
      </WrappedText>
      <Text color="white" variant="p">
        {!isVacationing}
      </Text>
      <TruncateText>{statusMessage}</TruncateText>
      {!isMobile && <Languages languages={languages} isMobile={isMobile} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  max-width: 70%;
  box-sizing: border-box;
  margin: 0 auto;
  align-items: center;

  @media screen and (max-width: ${breakpoints.mobile}) {
    align-items: flex-start;
    justify-content: center;
  }
`;

const NameDivider = styled.div`
  width: 16vw;
  height: 2px;
  border-bottom: 1px solid ${palette.white};
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
  color: ${palette.white};
  textalign: center;
`;

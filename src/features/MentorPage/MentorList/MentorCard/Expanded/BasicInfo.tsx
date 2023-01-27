import { useMobileMode } from '@/hooks/useMobileMode';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Text } from '@/components/Text/Text';
import { Languages } from './Languages';
import { Mentor } from '@/features/MentorPage/mentorPageApi';
import { breakpoints, palette } from '@/components/variables';

type Props = {
  mentor: Mentor;
};

export const BasicInfo = ({
  mentor: { name, age, region, statusMessage, languages },
}: Props) => {
  const isMobile = useMobileMode();
  const { t } = useTranslation('mentors');

  return (
    <Container>
      <NameText variant={isMobile ? 'h1' : 'h2'} color="white">
        {name}
      </NameText>
      {!isMobile && <NameDivider />}
      <WrappedText color="white">
        {age} {t('card.age')} <Divider>|</Divider>
        {region}
      </WrappedText>
      <TruncateText color="white">{statusMessage}</TruncateText>
      {!isMobile && <Languages languages={languages} isMobile={isMobile} />}
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 auto;
  max-width: 70%;

  @media screen and (max-width: ${breakpoints.mobile}) {
    align-items: flex-start;
    justify-content: center;
  }
`;

const NameText = styled(Text)`
  overflow-wrap: anywhere;
`;

const NameDivider = styled.div`
  border-bottom: 1px solid ${palette.white};
  height: 2px;
  margin-bottom: 0.5rem;
  margin-top: 0.25rem;
  width: 16vw;
`;

const Divider = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const WrappedText = styled(Text)`
  display: flex;
  flexwrap: wrap;
  margin: 0px;
`;

export const TruncateText = styled(Text)`
  margin: 0 0 0.5rem 0;
  overflow: hidden;
  textalign: center;
  textoverflow: ellipsis;
  whitespace: nowrap;
  width: 100%;
`;

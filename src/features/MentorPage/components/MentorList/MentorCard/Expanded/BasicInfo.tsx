import type { Mentor } from '@/features/MentorPage/mentorPageApi';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Text } from '@/components/Text/Text';
import { Languages } from './Languages';
import { breakpoints, palette } from '@/components/variables';

type Props = {
  mentor: Mentor;
  isMe: boolean;
};

export const BasicInfo = ({
  mentor: { name, age, region, statusMessage, languages },
  isMe,
}: Props) => {
  const { isMobile } = useGetLayoutMode();
  const { t } = useTranslation('mentors');

  return (
    <Container>
      <NameText
        variant={isMobile ? 'h1' : 'h2'}
        color={isMe ? 'blueDark' : 'white'}
      >
        {name}
      </NameText>
      {!isMobile && <NameDivider isMe={isMe} />}
      <WrappedText color={isMe ? 'blueDark' : 'white'}>
        {age} {t('card.age')} <Divider>|</Divider>
        {region}
      </WrappedText>
      <TruncateText color={isMe ? 'blueDark' : 'white'}>
        {statusMessage}
      </TruncateText>
      {!isMobile && (
        <Languages languages={languages} isMe={isMe} isMobile={isMobile} />
      )}
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

const NameDivider = styled.div<{ isMe: boolean }>`
  border-bottom: 1px solid ${({ isMe }) => (isMe ? palette.blueDark : 'white')};
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

import type { Mentor } from '@/features/MentorPage/mentorPageApi';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Text } from '@/components/Text/Text';
import { Languages } from './Languages';
import { breakpoints, palette } from '@/components/constants';

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
  const areLanguagesDisplayed = !isMobile && languages.length > 0;

  return (
    <Container isMobile={isMobile}>
      <NameText
        variant={isMobile ? 'h2' : 'h3'}
        color={isMe ? 'blueDark' : 'white'}
      >
        {name}
      </NameText>
      {!isMobile && <NameDivider isMe={isMe} />}
      <WrappedText color={isMe ? 'blueDark' : 'white'}>
        {age} {t('card.age')} <Divider>|</Divider>
        {region}
      </WrappedText>
      <TruncateText isMobile={isMobile} color={isMe ? 'blueDark' : 'white'}>
        {statusMessage}
      </TruncateText>
      {areLanguagesDisplayed && (
        <Languages languages={languages} isMe={isMe} isMobile={isMobile} />
      )}
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: ${({ isMobile }) =>
    isMobile ? '1.5rem auto 0.5rem auto' : ' 0 auto'};
  max-width: 70%;
  padding-bottom: ${({ isMobile }) => (isMobile ? '0' : '5rem')};

  @media screen and (max-width: ${breakpoints.mobile}) {
    align-items: flex-start;
    justify-content: center;
    margin-left: -2rem;
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
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const WrappedText = styled(Text)`
  display: flex;
  flexwrap: wrap;
  margin: 0px;
`;

export const TruncateText = styled(Text)<{ isMobile: boolean }>`
  ${({ isMobile }) => `
    margin: ${isMobile ? '0.25rem 0 0.5rem 0' : '1rem 0 3rem 0'};
    max-width: ${isMobile ? '100%' : '25vw'};
    text-align: ${isMobile ? 'left' : 'center'};
  `}
  overflow: hidden;
`;

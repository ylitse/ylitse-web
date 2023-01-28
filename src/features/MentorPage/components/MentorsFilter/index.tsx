import { selectSkills } from '../../mentorPageApi';
import { useAppSelector } from '@/store';
import { useTranslation } from 'react-i18next';

import { useMobileMode } from '@/hooks/useMobileMode';

import styled from 'styled-components';
import { palette } from '@/components/variables';
import { Text } from '@/components/Text/Text';
import KeywordSearch from './MentorSearch';
import Skills from './Skills';

const MentorsFilter = () => {
  const skills = useAppSelector(selectSkills());
  const { t } = useTranslation('mentors');
  const isMobile = useMobileMode();

  return isMobile ? (
    <MobileContainer>
      <MobileHeader variant="h1">{t('filters.title')}</MobileHeader>
    </MobileContainer>
  ) : (
    <Container>
      <DesktopHeader variant="h1">{t('filters.title')}</DesktopHeader>
      <KeywordSearch isSkillFilterExpanded={false} />
      <Divider />
      <Skills skills={skills} />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 1.5rem;
  height: auto;
  margin: 0;
  padding: 1.5rem 0;
  position: relative;
  width: 100%;
`;

const MobileContainer = styled.div`
  align-items: center;
  background-color: ${palette.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
`;

const MobileHeader = styled(Text)`
  align-self: flex-start;
`;

const DesktopHeader = styled(Text)`
  margin: 0;
  text-align: center;
`;

const Divider = styled.div`
  border-bottom: solid 1px ${palette.blueDark};
  margin: 0 6%;
`;

export default MentorsFilter;

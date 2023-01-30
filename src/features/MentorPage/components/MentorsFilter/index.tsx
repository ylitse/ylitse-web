import { useState } from 'react';

import { selectSkills } from '../../mentorPageApi';
import {
  changeSearchString,
  selectSearchString,
} from '@/features/MentorPage/mentorsFilterSlice';
import { useAppSelector, useAppDispatch } from '@/store';

import { useMobileMode } from '@/hooks/useMobileMode';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { palette } from '@/components/variables';
import { Text } from '@/components/Text/Text';
import DesktopSearch from './MentorSearch';
import MobileSearch from './MobileSearch';
import Skills from './Skills';

const MentorsFilter = () => {
  const [isSkillFilterExpanded, setIsSKillFilterExpanded] = useState(false);
  const skills = useAppSelector(selectSkills());
  const searchString = useAppSelector(selectSearchString);

  const dispatch = useAppDispatch();

  const handleSearchStringChange = (value: string) =>
    dispatch(changeSearchString(value));

  const { t } = useTranslation('mentors');
  const isMobile = useMobileMode();

  return isMobile ? (
    <MobileSearch
      searchString={searchString}
      onSearchStringChange={handleSearchStringChange}
    />
  ) : (
    <Container>
      <DesktopHeader variant="h1">{t('filters.title')}</DesktopHeader>
      <DesktopSearch
        isExpanded={isSkillFilterExpanded}
        toggleExpanded={setIsSKillFilterExpanded}
        searchString={searchString}
        onSearchStringChange={handleSearchStringChange}
      />
      {isSkillFilterExpanded && (
        <>
          <Divider />
          <Skills skills={skills} />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 2.5rem;
  height: auto;
  margin: 0;
  padding: 2.5rem 0;
  position: relative;
  width: 100%;
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

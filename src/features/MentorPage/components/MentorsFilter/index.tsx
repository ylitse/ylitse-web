import { useState } from 'react';

import { selectSkills } from '../../mentorPageApi';
import { useAppSelector } from '@/store';
import { useTranslation } from 'react-i18next';

import Filters from './Filters/Filters';
import MentorSearch from './MentorSearch';
import SkillChips from './Skills/';

const MentorsFilter = () => {
  const skills = useAppSelector(selectSkills());
  const { t } = useTranslation('mentors');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  return (
    <Filters
      headLine={t('title')}
      onFiltersClose={() => setIsFiltersVisible(true)}
      isFiltersVisible={isFiltersVisible}
    >
      {isFiltersVisible && (
        <>
          <MentorSearch />
          <SkillChips
            skills={skills}
            onFiltersClose={() => setIsFiltersVisible(false)}
          />
        </>
      )}
    </Filters>
  );
};

export default MentorsFilter;

import { useState } from 'react';
import Filters from './Filters/Filters';
import MentorSearch from './MentorSearch';
import SkillChips from './Skills/';

import { selectSkills } from '../mentorPageApi';
import { useAppSelector } from '@/store';
import { useTranslation } from 'react-i18next';

const MentorsFilter = () => {
  const skills = useAppSelector(selectSkills());
  const { t } = useTranslation();
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  return (
    <Filters
      headLine={t('mentorPage.title')}
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

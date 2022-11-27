import { useState } from 'react';
import Filters from './Filters/Filters';
import MentorSearch from './MentorSearch';
import SkillChips from './Skills/';

import { selectSkills } from '../mentorPageApi';
import { useAppSelector } from '../../../store';

const mentorPageHeadline = 'Mentorit';

const MentorsFilter = () => {
  const skills = useAppSelector(selectSkills());
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  return (
    <Filters
      headLine={mentorPageHeadline}
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

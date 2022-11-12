import OneContainerLayout from '../../../components/OneContainerLayout';
import MentorSearch from './MentorSearch';
import SkillChips from './Skills/';

import { useSelector } from 'react-redux';
import { selectSkills } from '../mentorPageApi';

const mentorPageHeadline = 'Mentorit';

const MentorsFilter = () => {
  const skills = useSelector(selectSkills());

  return (
    <OneContainerLayout headLine={mentorPageHeadline}>
      <MentorSearch />
      <SkillChips skills={skills} />
    </OneContainerLayout>
  );
};

export default MentorsFilter;

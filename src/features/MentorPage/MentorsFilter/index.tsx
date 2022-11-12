import OneContainerLayout from '../../../components/OneContainerLayout';
import MentorSearch from './MentorSearch';
import SkillChips from './Skills/';

import { selectSkills } from '../mentorPageApi';
import { useAppSelector } from '../../../store';

const mentorPageHeadline = 'Mentorit';

const MentorsFilter = () => {
  const skills = useAppSelector(selectSkills());

  return (
    <OneContainerLayout headLine={mentorPageHeadline}>
      <MentorSearch />
      <SkillChips skills={skills} />
    </OneContainerLayout>
  );
};

export default MentorsFilter;

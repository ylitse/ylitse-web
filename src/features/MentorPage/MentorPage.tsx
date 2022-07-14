import OneContainerLayout from '../../components/OneContainerLayout';
import MentorInfoSearchDiv from './MentorInfoSearch';
import MentorChips from './MentorChips';
import { ChipProps } from '../../components/Chip/types';
import MentorCards from './MentorCards';
import PageLayout from '../../components/PageLayout';

const mentorPageHeadline = 'Mentorit';

const mentorChipList: Array<ChipProps> = [
  {
    text: 'Ahdistus',
  },
  {
    text: 'Avioliitto',
  },
  {
    text: 'Alkoholismi',
  },
];

const MentorPage = () => {
  return (
    <PageLayout>
      <OneContainerLayout headLine={mentorPageHeadline}>
        <MentorInfoSearchDiv />
        <MentorChips items={mentorChipList}/>
      </OneContainerLayout>
      <MentorCards />
    </PageLayout>
  );
};

export default MentorPage;

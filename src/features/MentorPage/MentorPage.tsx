import OneContainerLayout from '../../components/OneContainerLayout';
import MentorInfoSearchDiv from './MentorInfoSearch';
import MentorChips from './MentorChips';
import MentorCards from './MentorCards';
import PageLayout from '../../components/PageLayout';

const mentorPageHeadline = 'Mentorit';

const MentorPage = () => {
  return (
    <PageLayout>
      <OneContainerLayout headLine={mentorPageHeadline}>
        <MentorInfoSearchDiv />
        <MentorChips />
      </OneContainerLayout>
      <MentorCards />
    </PageLayout>
  );
};

export default MentorPage;

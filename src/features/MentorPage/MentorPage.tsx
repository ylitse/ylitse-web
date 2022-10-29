import OneContainerLayout from '../../components/OneContainerLayout';
import MentorInfoSearchDiv from './MentorSearch';
import MentorChips from './MentorChips';
import MentorList from './MentorList';
import PageLayout from '../../components/PageLayout';
import React from 'react';
import MentorCard from './MentorCard';
import { Mentor, useGetMentorsQuery, selectSkills } from './mentorPageApi';
import { useSelector } from 'react-redux';

const mentorPageHeadline = 'Mentorit';

const MentorPage = () => {
  const [selectedMentor, setSelectedMentor] = React.useState<Mentor | null>(
    null,
  );

  const { data: mentors, isLoading } = useGetMentorsQuery();
  const skills = useSelector(selectSkills());

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <PageLayout>
      {selectedMentor && (
        <MentorCard
          mentor={selectedMentor}
          onDismiss={() => setSelectedMentor(null)}
        />
      )}
      <OneContainerLayout headLine={mentorPageHeadline}>
        <MentorInfoSearchDiv />
        <MentorChips skills={skills} />
      </OneContainerLayout>
      {mentors && (
        <MentorList
          setVisibleCard={mentor => setSelectedMentor(mentor)}
          mentors={mentors}
        />
      )}
    </PageLayout>
  );
};
export default MentorPage;

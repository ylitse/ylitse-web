import React from 'react';
import OneContainerLayout from '../../components/OneContainerLayout';
import MentorInfoSearchDiv from './MentorSearch';
import MentorChips from './MentorChips';
import MentorList from './MentorList';
import PageLayout from '../../components/PageLayout';
import MentorCard from './MentorCard';
import Spinner from '../../components/Spinner';
import { Mentor, useGetMentorsQuery, selectSkills } from './mentorPageApi';
import { useSelector } from 'react-redux';

const mentorPageHeadline = 'Mentorit';

const MentorPage = () => {
  const [selectedMentor, setSelectedMentor] = React.useState<Mentor | null>(
    null,
  );

  const { data: mentors, isLoading } = useGetMentorsQuery();
  const skills = useSelector(selectSkills());

  return (
    <PageLayout>
      {isLoading ? (
        <Spinner variant="large" />
      ) : (
        <>
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
        </>
      )}
    </PageLayout>
  );
};
export default MentorPage;

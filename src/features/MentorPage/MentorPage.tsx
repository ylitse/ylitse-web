import React from 'react';
import MentorsFilter from './MentorsFilter';
import MentorList from './MentorList';
import PageLayout from '../../components/PageLayout';
import MentorCard from './MentorList/MentorCard/Expanded';
import Spinner from '../../components/Spinner';
import { Mentor, useGetMentorsQuery } from './mentorPageApi';

const MentorPage = () => {
  const [selectedMentor, setSelectedMentor] = React.useState<Mentor | null>(
    null,
  );

  const { data: mentors, isLoading } = useGetMentorsQuery();

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
          <MentorsFilter />
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

import React from 'react';
import MentorsFilter from './MentorsFilter';
import MentorList from './MentorList';
import PageWithTransition from '../../components/PageWithTransition';
import MentorCard from './MentorList/MentorCard/Expanded';
import Spinner from '@/components/Spinner';
import {
  Mentor,
  selectFilteredMentors,
  useGetMentorsQuery,
} from './mentorPageApi';
import { useAppSelector } from '@/store';

const MentorPage = () => {
  const [selectedMentor, setSelectedMentor] = React.useState<Mentor | null>(
    null,
  );

  const { isLoading } = useGetMentorsQuery();
  const mentors = useAppSelector(selectFilteredMentors());

  return (
    <PageWithTransition>
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
          <MentorList
            setVisibleCard={mentor => setSelectedMentor(mentor)}
            mentors={mentors}
          />
        </>
      )}
    </PageWithTransition>
  );
};
export default MentorPage;

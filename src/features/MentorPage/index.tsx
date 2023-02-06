import { useState } from 'react';

import {
  Mentor,
  selectFilteredMentors,
  useGetMentorsQuery,
} from './mentorPageApi';
import { useAppSelector } from '@/store';

import PageWithTransition from '@/components/PageWithTransition';
import Spinner from '@/components/Spinner';
import MentorsFilter from './components/MentorsFilter';
import MentorList from './components/MentorList';
import MentorCard from './components/MentorList/MentorCard/Expanded';

const MentorPage = () => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const { isLoading } = useGetMentorsQuery();
  const mentors = useAppSelector(selectFilteredMentors());

  return (
    <PageWithTransition isMentorPage>
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

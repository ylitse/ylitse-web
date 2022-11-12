import styled from 'styled-components';
import ListCard from './MentorCard/List';
import * as cssVariables from '../../../components/variables';
import { Mentor } from '../mentorPageApi';

type Props = {
  mentors: Array<Mentor>;
  setVisibleCard: (mentor: Mentor) => void;
};

const MentorList: React.FC<Props> = ({ setVisibleCard, mentors }) => {
  return (
    <CardsList data-testid="mentor-cards-container">
      <>
        {mentors.map(mentor => (
          <ListCard
            key={mentor.buddyId}
            mentor={mentor}
            setVisibleCard={setVisibleCard}
          />
        ))}
      </>
    </CardsList>
  );
};

const CardsList = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
  height: auto;
  width: calc(76vw + (${cssVariables.spacing.layout_spacing} * 2));
  margin-top: ${cssVariables.spacing.layout_spacing};
  margin-left: calc(${cssVariables.spacing.layout_spacing} * -1);
  @media screen and (max-width: 1500px) {
    width: calc(1130px + (${cssVariables.spacing.layout_spacing} * 2));
    max-width: 100vw;
  }
`;

export default MentorList;

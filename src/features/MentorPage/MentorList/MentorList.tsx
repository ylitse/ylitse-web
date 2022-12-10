import styled, { css } from 'styled-components';
import * as cssVariables from '../../../components/variables';
import ListCard from './MentorCard/List';
import { Mentor } from '../mentorPageApi';
import { useMobileMode } from '../../../hooks/useMobileMode';

type Props = {
  mentors: Array<Mentor>;
  setVisibleCard: (mentor: Mentor) => void;
};

const MentorList: React.FC<Props> = ({ setVisibleCard, mentors }) => {
  const isMobile = useMobileMode();

  return (
    <CardsList isMobile={isMobile} data-testid="mentor-cards-container">
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

const CardsList = styled.div<{ isMobile: boolean }>`
  flex: 1;
  display: flex;
  ${({ isMobile }) =>
    isMobile
      ? css`
          scroll-snap-type: x mandatory;
          overflow: auto;
          white-space: nowrap;
          gap: 1.5rem;
          &::-webkit-scrollbar {
            display: none;
          }
        `
      : css`
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
        `}
`;

export default MentorList;

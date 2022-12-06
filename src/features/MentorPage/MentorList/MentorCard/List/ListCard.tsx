import styled from 'styled-components';
import { Header } from './Header';
import { Languages } from './Languages';
import { Skills } from './Skills';
import { Story } from './Story';
import { ExpandButton } from './ExpandButton';
import * as cssVariables from '../../../../../components/variables';
import { Mentor } from '../../../mentorPageApi';

type Props = {
  setVisibleCard: (mentor: Mentor) => void;
  mentor: Mentor;
};

export const ListCard: React.FC<Props> = ({ setVisibleCard, mentor }) => {
  return (
    <Container>
      <Header
        name={mentor.name}
        age={mentor.age}
        region={mentor.region}
        isAvailable={!mentor.isVacationing}
        message={mentor.statusMessage}
      />
      <CardContent>
        <Story story={mentor.story} />
        <Languages languages={mentor.languages} />
        <Skills skills={mentor.skills} />
        <ExpandButton setVisibleCard={setVisibleCard} mentor={mentor} />
      </CardContent>
    </Container>
  );
};

const Container = styled.div`
  flex: 0 0 30%;
  display: flex;
  flex-wrap: wrap;
  background-color: ${cssVariables.palette.white};
  border-radius: 0.75rem;
  flex-direction: column;
  margin: ${cssVariables.spacing.layout_spacing};
  max-width: calc(
    ((76vw + ${cssVariables.spacing.layout_spacing} * 2) / 3) -
      (${cssVariables.spacing.layout_spacing} * 2)
  );
  @media screen and (min-width: 2100px) {
    flex: 0 0 25%;
    max-width: calc(
      ((76vw + ${cssVariables.spacing.layout_spacing} * 2) / 4) -
        (${cssVariables.spacing.layout_spacing} * 2)
    );
  }
  @media screen and (min-width: 2550px) {
    flex: 0 0 20%;
    max-width: calc(
      ((76vw + ${cssVariables.spacing.layout_spacing} * 2) / 5) -
        (${cssVariables.spacing.layout_spacing} * 2)
    );
  }
  @media screen and (max-width: 1500px) {
    flex: 0 0 30%;
    max-width: calc(
      ((1130px + (${cssVariables.spacing.layout_spacing} * 2)) / 3) -
        (${cssVariables.spacing.layout_spacing} * 2)
    );
  }
  @media screen and (max-width: 1186px) {
    max-width: calc((100vw / 3) - (${cssVariables.spacing.layout_spacing} * 2));
  }
  @media screen and (max-width: 900px) {
    flex: 0 0 50%;
    max-width: calc((100vw / 2) - (${cssVariables.spacing.layout_spacing} * 2));
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.9rem;
  justify-content: space-between;
`;

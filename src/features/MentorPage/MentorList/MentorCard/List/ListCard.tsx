import styled, { css } from 'styled-components';
import { Header } from './Header';
import { Languages } from './Languages';
import { Skills } from './Skills';
import { Story } from './Story';
import { ExpandButton } from './ExpandButton';
import { spacing, palette } from '../../../../../components/variables';
import { Mentor } from '../../../mentorPageApi';
import { useMobileMode } from '../../../../../hooks/useMobileMode';

type Props = {
  setVisibleCard: (mentor: Mentor) => void;
  mentor: Mentor;
};

export const ListCard: React.FC<Props> = ({ setVisibleCard, mentor }) => {
  const isMobile = useMobileMode();

  return (
    <Container isMobile={isMobile}>
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

const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${palette.white};
  border-radius: 0.75rem;

  ${({ isMobile }) =>
    isMobile
      ? css`
          margin: 1rem 0;
          min-width: 80%;
          max-height: 40%;
          scroll-behavior: smooth;
          scroll-snap-align: center;

          &:first-child {
            margin-left: 1.5rem;
          }

          &:last-child {
            margin-right: 1.5rem;
          }
        `
      : css`
          flex: 0 0 30%;
          flex-wrap: wrap;
          margin: ${spacing.layout_spacing};
          max-width: calc(
            ((76vw + ${spacing.layout_spacing} * 2) / 3) -
              (${spacing.layout_spacing} * 2)
          );
          @media screen and (min-width: 2100px) {
            flex: 0 0 25%;
            max-width: calc(
              ((76vw + ${spacing.layout_spacing} * 2) / 4) -
                (${spacing.layout_spacing} * 2)
            );
          }
          @media screen and (min-width: 2550px) {
            flex: 0 0 20%;
            max-width: calc(
              ((76vw + ${spacing.layout_spacing} * 2) / 5) -
                (${spacing.layout_spacing} * 2)
            );
          }
          @media screen and (max-width: 1500px) {
            flex: 0 0 30%;
            max-width: calc(
              ((1130px + (${spacing.layout_spacing} * 2)) / 3) -
                (${spacing.layout_spacing} * 2)
            );
          }
          @media screen and (max-width: 1186px) {
            max-width: calc((100vw / 3) - (${spacing.layout_spacing} * 2));
          }
          @media screen and (max-width: 900px) {
            flex: 0 0 50%;
            max-width: calc((100vw / 2) - (${spacing.layout_spacing} * 2));
          }
        `}
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.9rem;
  justify-content: space-between;
`;

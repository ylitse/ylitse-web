import styled from 'styled-components';
import ListCard from '../ListCard';
import { MentorListItemsProps } from './types';
import * as cssVariables from '../../../components/variables';
import { handleSetVisibleCardProps } from '../MentorPage';
import { ListCardProps } from '../ListCard/types';

/**
 * Mentor cards listing on mentor page
 */

type Props = {
  setVisibleCard: ({
    shouldShowMentorCard,
    mentorCardData,
  }: handleSetVisibleCardProps) => void;
  item: ListCardProps;
};

const MapMentorCard = ({ setVisibleCard, item }: Props) => {
  if (item) {
    return (
      <ListCard
        key={item.mentor.displayName}
        mentorCardData={item}
        setVisibleCard={setVisibleCard}
      />
    );
  }
  return <></>;
};

const MentorListItems = ({
  setVisibleCard,
  mentorCardData,
}: MentorListItemsProps) => {
  if (mentorCardData !== undefined) {
    return (
      <CardsList data-testid="mentor-cards-container">
        {mentorCardData.map(item => MapMentorCard({ setVisibleCard, item }))}
      </CardsList>
    );
  }
  return <></>;
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

export default MentorListItems;

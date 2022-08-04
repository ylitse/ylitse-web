import { ListCardProps } from '../ListCard/types';
import { handleSetVisibleCardProps } from '../MentorPage';

export type MentorListItemsProps = {
  setVisibleCard: ({
    shouldShowMentorCard,
    mentorCardData,
  }: handleSetVisibleCardProps) => void;
  mentorCardData: Array<ListCardProps>;
};

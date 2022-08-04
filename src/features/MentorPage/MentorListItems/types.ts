import { ListCardProps } from '../ListCard/types';

export type MentorListItemsProps = {
  setVisibleCard: (mentorCardData: ListCardProps) => void;
  mentorData: Array<ListCardProps>;
};

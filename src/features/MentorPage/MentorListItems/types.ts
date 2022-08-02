import { ListCardProps } from '../ListCard/types';

export type MentorListItemsProps = {
  setVisibleCard: (mentorCardData: ListCardProps) => void;
  mentordata: Array<ListCardProps>;
};

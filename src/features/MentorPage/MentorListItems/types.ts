import { ListCardProps, MentorProps } from '../ListCard/types';

export type MentorListItemsProps = {
  setVisibleCard: (mentorCardData: ListCardProps) => void;
  mentordata: Array<ListCardProps>;
};

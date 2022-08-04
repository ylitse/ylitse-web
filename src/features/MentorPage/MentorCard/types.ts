import { ListCardProps } from '../ListCard/types';

export type MentorListItemsProps = {
  setVisibleCard: (
    shouldShowMentorCard: boolean,
    mentorCardData: ListCardProps,
  ) => void;
  mentordata: Array<ListCardProps>;
};

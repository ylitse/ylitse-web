import { handleSetVisibleCardProps } from '../MentorPage';
import { Mentors } from '../mentorPageApi';

export type MentorListItemsProps = {
  setVisibleCard: ({
    shouldShowMentorCard,
    mentorCardData,
  }: handleSetVisibleCardProps) => void;
  mentorCardData: Mentors;
};

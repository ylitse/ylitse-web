import { ChipProps } from '../../../components/Chip/types';

export type MentorProps = {
  displayName: string;
  birthYear: number;
  region: string;
  story: string;
  skills: Array<ChipProps>;
  languages: Array<string>;
};

export type ListCardProps =
  | {
      mentor: MentorProps;
      isLoggedIn: boolean;
      isNewMentor: boolean;
      contactMessage: string;
    }
  | undefined;

import {
  StyledMentorSearch,
  StyledMentorSearchBox,
  StyledSearchIcon,
} from './MentorSearch.styles';

const MentorPage = () => {
  return (
    <StyledMentorSearchBox>
      <StyledSearchIcon />
      <StyledMentorSearch type="text" placeholder="Etsi mentoria"></StyledMentorSearch>
    </StyledMentorSearchBox>
  );
};

export default MentorPage;

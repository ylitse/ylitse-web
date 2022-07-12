import {
  MentorSearch,
  MentorSearchBox,
  SearchIcon,
} from './MentorSearch.styles';

const MentorPage = () => {
  return (
    <MentorSearchBox>
      <SearchIcon />
      <MentorSearch type="text" placeholder="Etsi mentoria"></MentorSearch>
    </MentorSearchBox>
  );
};

export default MentorPage;

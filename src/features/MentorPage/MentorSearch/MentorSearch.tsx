import SearchBar from '../../../components/SearchBar';

/**
 * Logic for SerachBar should be added here.
 * Styles and layout are fetched from Searcbar
 */

const mentorSearchbarPlaceholder = 'Etsi mentoria';

const MentorSearch = () => {
  return (
    <SearchBar
      placeholder={mentorSearchbarPlaceholder}
      label={mentorSearchbarPlaceholder}
    />
  );
};

export default MentorSearch;

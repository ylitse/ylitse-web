import { StyledMentorSearchElement, StyledMentorPage, StyledMentorHeader } from './MentorPage.styles';
import NavigationBar from '../Navigation';

const MentorPage = () => {
  return (
    <StyledMentorPage>
      <StyledMentorSearchElement>
				<StyledMentorHeader>Mentorit</StyledMentorHeader>
			</StyledMentorSearchElement>
    </StyledMentorPage>
  );
};

export default MentorPage;

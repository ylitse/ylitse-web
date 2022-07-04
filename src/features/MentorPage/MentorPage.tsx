import {
  StyledMentorSearchElement,
  StyledMentorPage,
  StyledMentorHeader,
  StyledMentorInfoText,
  StyledMentorSearchDiv,
} from './MentorPage.styles';
import MentorSkills from '../MentorSkills';
import MentorSearch from '../MentorSearch';

const MentorPage = () => {
  return (
    <StyledMentorPage>
      <StyledMentorSearchElement>
        <StyledMentorHeader>Mentorit</StyledMentorHeader>
        <StyledMentorSearchDiv>
          <StyledMentorInfoText>
            Tervetuloa selaamaan mentoreiden profiileja! Löydät uusimmat mentorit listassa ensimmäisenä. Hakutoimintoa käyttämällä
            voit rajata mentoreita ongelmasi perusteella
          </StyledMentorInfoText>
          <MentorSearch/>
          <MentorSkills/>
        </StyledMentorSearchDiv>
      </StyledMentorSearchElement>
    </StyledMentorPage>
  );
};

export default MentorPage;

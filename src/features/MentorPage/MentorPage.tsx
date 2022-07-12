import {
  MentorSearchElement,
  MentorPageElement,
  MentorHeader,
  MentorInfoText,
  MentorSearchDiv,
  MentorCardContainer,
} from './MentorPage.styles';
import MentorSkills from '../MentorSkills';
import MentorSearch from '../MentorSearch';

const MentorPage = () => {
  return (
    <MentorPageElement>
      <MentorSearchElement>
        <MentorHeader>Mentorit</MentorHeader>
        <MentorSearchDiv>
          <MentorInfoText>
            Tervetuloa selaamaan mentoreiden profiileja! Löydät uusimmat
            mentorit listassa ensimmäisenä. Hakutoimintoa käyttämällä voit
            rajata mentoreita ongelmasi perusteella
          </MentorInfoText>
          <MentorSearch />
          <MentorSkills />
        </MentorSearchDiv>
      </MentorSearchElement>
      <MentorCardContainer></MentorCardContainer>
    </MentorPageElement>
  );
};

export default MentorPage;

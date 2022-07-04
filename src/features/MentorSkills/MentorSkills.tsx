import {
  StyledSkillContainer,
  StyledSkill,
  StyledMoreContainer,
  StyledMoreIcon,
  StyledShowMoreButton,
} from './MentorSkills.styles';

const MentorSkills = () => {
  return (
    <StyledSkillContainer>
      <StyledSkill>Ahdistus</StyledSkill>
      <StyledSkill>Avioliitto</StyledSkill>
      <StyledSkill>Alkoholismi</StyledSkill>
      <StyledMoreContainer>
        <StyledMoreIcon />
        <StyledShowMoreButton>Näytä kaikki aiheet</StyledShowMoreButton>
      </StyledMoreContainer>
    </StyledSkillContainer>
  );
};

export default MentorSkills;

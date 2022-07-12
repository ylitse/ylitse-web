import { MentorskillItem } from './types';
import styled from 'styled-components';
import MentorSkill from './MentorSkill';
import ShowMoreSkills from './ShowMoreSkills';

const SkillContainer = styled.div`
  flex: 0 0 auto;
  width: 90%;
  height: 20rem;
  display: flex;
  flex-wrap: wrap;
  margin-top: 3rem;
  justify-content: center;
  position: relative;
`;

const MentorSkillList: Array<MentorskillItem> = [
  {
    text: 'Ahdistus',
  },
  {
    text: 'Avioliitto',
  },
  {
    text: 'Alkoholismi',
  },
];

const MentorSkills = () => {
  console.log(MentorSkillList);
  MentorSkillList.map(item => console.log(item));
  return (
    <SkillContainer>
      <MentorSkill items={MentorSkillList} />
      <ShowMoreSkills />
    </SkillContainer>
  );
};

export default MentorSkills;

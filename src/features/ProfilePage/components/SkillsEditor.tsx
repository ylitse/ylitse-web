import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { selectAllSkillOptions } from '@/features/MentorPage/selectors';
import { useAppSelector } from '@/store';

import { Chip } from '@/components/Chip';
import DropdownSearch from '@/components/DropdownSearch/DropdownSearch';
import Text from '@/components/Text';

type Props = {
  updateSkills: (skills: string[]) => void;
  skills: string[];
};

const SkillsEditor = ({ updateSkills, skills }: Props) => {
  const { t } = useTranslation('profile');
  const skillOptions = useAppSelector(selectAllSkillOptions());

  const addSkill = (skill: string) => updateSkills([...skills, skill]);

  const removeSkill = (skill: string) =>
    updateSkills(skills.filter(s => s !== skill));

  return (
    <Container>
      <Text variant="label">{t('public.mentor.skills')}</Text>
      <Skills>
        {skills.map(skill => (
          <Chip key={skill} text={skill} onToggle={removeSkill} />
        ))}
      </Skills>
      <DropdownSearch
        options={skillOptions.filter(so => !skills.includes(so))} // Options should not include already chosen skills
        placeholder={t('public.mentor.addSkill')}
        selectOption={addSkill}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export default SkillsEditor;

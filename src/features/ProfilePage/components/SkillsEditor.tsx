import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectAllSkillOptions } from '@/features/MentorPage/selectors';
import { useAppSelector } from '@/store';
import { useGetMentorsQuery } from '@/features/MentorPage/mentorPageApi';

import { Chip } from '@/components/Chip';
import { Column } from '@/components/common';
import DropdownSearch from '@/components/DropdownSearch/DropdownSearch';
import Text from '@/components/Text';

type Props = {
  updateSkills: (skills: string[]) => void;
  skills: string[];
};

const SkillsEditor = ({ updateSkills, skills }: Props) => {
  const { t } = useTranslation('profile');

  const { isLoading } = useGetMentorsQuery();
  const allSkills = useAppSelector(selectAllSkillOptions());

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const addSkill = (skill: string) => {
    setIsDropdownVisible(false);
    updateSkills([...skills, skill]);
  };

  const removeSkill = (skill: string) => {
    setIsDropdownVisible(false);
    updateSkills(skills.filter(s => s !== skill));
  };

  // Options should not include already chosen skills
  const skillOptions = allSkills.filter(skill => !skills.includes(skill));

  return (
    <Container>
      <Text variant="label">{t('public.mentor.skills')}</Text>
      <Skills>
        {skills.map(skill => (
          <Chip key={skill} text={skill} onToggle={removeSkill} />
        ))}
      </Skills>
      <DropdownSearch
        isDisabled={isLoading}
        isDropdownVisible={isDropdownVisible}
        options={skillOptions}
        placeholder={t('public.mentor.addSkill')}
        selectOption={addSkill}
        setIsDropdownVisible={setIsDropdownVisible}
      />
    </Container>
  );
};

const Container = styled(Column)`
  margin: 1rem 0;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export default SkillsEditor;

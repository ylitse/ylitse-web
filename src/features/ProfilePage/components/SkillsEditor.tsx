import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { selectAllSkillOptions } from '@/features/MentorPage/selectors';
import { useAppSelector } from '@/store';

import { Chip } from '@/components/Chip';
import { DEFAULT_ICON_SIZE } from '@/components/constants';
import DropdownSearch from '@/components/DropdownSearch/DropdownSearch';
import Text from '@/components/Text';

type Props = {
  onChange: (value: string[]) => void;
  skills: string[];
};

const SkillsEditor = ({ onChange, skills }: Props) => {
  const { t } = useTranslation('profile');

  const skillSelection = useAppSelector(selectAllSkillOptions());

  const addSkill = (skill: string) => {
    onChange([...skills, skill]);
  };

  const removeSkill = (skill: string) => {
    const updatedSkills = skills.filter(s => s !== skill);
    onChange(updatedSkills);
  };

  return (
    <>
      <Label variant="label">{t('public.mentor.skills')}</Label>
      <Skills>
        {skills.map(skill => (
          <Chip
            key={skill}
            text={skill}
            isSelected={true}
            shouldShake={false}
            onToggle={removeSkill}
          />
        ))}
      </Skills>
      <SearchBar>
        <DropdownSearch
          addSkill={addSkill}
          options={skillSelection}
          placeholder={t('public.mentor.addSkill')}
        />
      </SearchBar>
    </>
  );
};

const Label = styled(Text)`
  margin-top: 1rem;
`;

const Skills = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 1rem;
  overflow: hidden;
  width: 100%;
`;

const SearchBar = styled.div`
  align-items: center;
  align-self: flex-start;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-left: -${DEFAULT_ICON_SIZE.SMALL}px;
  margin-top: 1rem;
  max-width: 350px;
`;

export default SkillsEditor;

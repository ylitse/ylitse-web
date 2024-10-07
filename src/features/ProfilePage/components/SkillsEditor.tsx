import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectAllSkillOptions } from '@/features/MentorPage/selectors';
import { useAppSelector } from '@/store';
import { useGetMentorsQuery } from '@/features/MentorPage/mentorPageApi';

import { Chip } from '@/components/Chip';
import { Column } from '@/components/common';
import { palette } from '@/components/constants';
import SearchBar from '@/components/SearchBar';
import Text from '@/components/Text';

type Props = {
  updateSkills: (skills: string[]) => void;
  skills: string[];
};

const SkillsEditor = ({ updateSkills, skills }: Props) => {
  const { t } = useTranslation('profile');

  // This should be run before all skill options are selected
  console.log('Haetaan mentorit');
  const { isLoading } = useGetMentorsQuery();
  console.log('Ladataan on', isLoading);

  const allSkills = useAppSelector(selectAllSkillOptions());
  // Options should not include already chosen skills

  const addSkill = (skill: string) => updateSkills([...skills, skill]);

  const removeSkill = (skill: string) => {
    updateSkills(skills.filter(s => s !== skill));
    // setNotChosenOptions([...notChosenOptions, skill]);
    // setFilteredOptions([...filteredOptions, skill]);
  };

  // Pasted code
  const [query, setQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // const [notChosenOptions, setNotChosenOptions] = useState(skillOptions);
  // const [filteredOptions, setFilteredOptions] = useState(skillOptions);

  const handleOptionClick = (option: string) => {
    setQuery('');
    // const notChosen = notChosenOptions.filter(o => o !== option);
    // setNotChosenOptions(notChosen);
    // setFilteredOptions(notChosen);
    setIsDropdownVisible(false);
    addSkill(option);
  };

  // Delay dropdown hide to allow click event on options
  const handleBlur = () => setTimeout(() => setIsDropdownVisible(false), 200);
  const handleFocus = () => setIsDropdownVisible(true);

  const getSkillsToShowInDropdown = (): string[] => {
    return allSkills
      .filter(option => !skills.includes(option))
      .filter(option => {
        if (query.length === 0) return option;
        return option.toLowerCase().includes(query.toLowerCase());
      });
  };

  const isDropdownOpen =
    isDropdownVisible && getSkillsToShowInDropdown().length > 0;

  return (
    <Container>
      <Text variant="label">{t('public.mentor.skills')}</Text>
      <Skills>
        {skills.map(skill => (
          <Chip key={skill} text={skill} onToggle={removeSkill} />
        ))}
      </Skills>
      <InnerContainer>
        <SearchBar
          isDisabled={isLoading}
          hasOpenDropdown={isDropdownOpen}
          onBlur={handleBlur}
          onChange={setQuery}
          onFocus={handleFocus}
          placeholder={t('public.mentor.addSkill')}
          value={query}
          variant="small"
        />
        {isDropdownOpen && (
          <Dropdown>
            {getSkillsToShowInDropdown().map((option, index) => (
              <DropdownItem
                key={index}
                onClick={() => handleOptionClick(option)}
              >
                <Text variant="menuOption">{option}</Text>
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </InnerContainer>
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

const InnerContainer = styled.div`
  margin: 1rem 0;
  max-width: 350px;
  position: relative;
`;

const Dropdown = styled.div`
  background-color: white;
  border: 1px solid ${palette.purple};
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  max-height: 200px;
  outline: ${palette.purple} solid 2px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  z-index: 10;
`;

const DropdownItem = styled.div`
  cursor: pointer;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: ${palette.blueLight};
  }
`;

export default SkillsEditor;

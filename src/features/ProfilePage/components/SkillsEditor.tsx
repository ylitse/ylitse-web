import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_ICON_SIZE, palette } from '@/components/constants';
import Text from '@/components/Text';
import TextInput from '@/components/TextInput';

type Props = {
  skills: string[];
};

const SkillsEditor = ({ skills }: Props) => {
  const { t } = useTranslation('profile');
  const [skillSearchValue, setSkillSearchValue] = useState('');

  console.log(skills);

  return (
    <>
      <Label variant="label">{t('public.mentor.skills')}</Label>
      <SearchBar>
        <SkillSearch
          variant="iconInput"
          color={skillSearchValue ? 'blueDark' : 'greyFaded'}
          leftIcon={{
            sizeInPx: DEFAULT_ICON_SIZE.SMALL,
            variant: 'search',
          }}
          onChange={setSkillSearchValue}
          placeholder={t('public.mentor.addSkill')}
          value={skillSearchValue}
        />
      </SearchBar>
    </>
  );
};

const Label = styled(Text)`
  margin-top: 1rem;
`;

const SearchBar = styled.div`
  align-items: center;
  align-self: flex-start;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-left: -${DEFAULT_ICON_SIZE.SMALL}px;
  margin-top: 1rem;
`;

const SkillSearch = styled(TextInput)`
  max-width: 350px;

  &:focus {
    outline: 1px solid ${palette.purple};
  }
`;

export default SkillsEditor;

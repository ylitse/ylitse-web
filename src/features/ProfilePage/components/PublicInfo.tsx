import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectMentor, selectUser } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';
import { useDebounce } from '@/hooks/useDebounce';
import { useUpdateMentorMutation } from '@/features/MentorPage/mentorPageApi';
import { useUpdateUserMutation } from '@/features/Authentication/authenticationApi';

import {
  DEFAULT_ICON_SIZE,
  palette,
  SAVE_DELAY_MS,
} from '@/components/constants';
import LabeledInput from '@/components/LabeledInput';
import Slider from '@/components/Slider';
import Text from '@/components/Text';
import TextInput from '@/components/TextInput';

import type {
  MentorUser,
  User,
} from '@/features/Authentication/authenticationApi';

const PublicInfo = () => {
  const { t } = useTranslation('profile');
  const user = useAppSelector(selectUser);
  const mentor = useAppSelector(selectMentor);
  const [updateUser] = useUpdateUserMutation();
  const [updateMentor] = useUpdateMentorMutation();

  const saveMentorData = useDebounce(
    (mentor: MentorUser) => updateMentor(mentor),
    SAVE_DELAY_MS,
  );

  const saveUserAndMentorData = useDebounce(
    (mentor: MentorUser, user: User) => {
      updateUser(user);
      updateMentor(mentor);
    },
    SAVE_DELAY_MS,
  );

  const [localData, setLocalData] = useState<MentorUser>(mentor);
  const [skillSearchValue, setSkillSearchValue] = useState('');

  const updateMentorData = (key: keyof MentorUser, value: string) => {
    setLocalData({ ...localData, [key]: value });
    saveMentorData({ ...mentor, [key]: value });
  };

  const handleDisplayNameChange = (display_name: string) => {
    setLocalData({ ...localData, display_name });
    saveUserAndMentorData(
      { ...mentor, display_name },
      { ...user, display_name },
    );
  };

  const handleBirthYearChange = (birth_year: string) => {
    setLocalData({ ...localData, birth_year: Number(birth_year) });
    saveMentorData({ ...mentor, birth_year: Number(birth_year) });
  };

  const handleIsVacationingChange = () => {
    setLocalData({ ...localData, is_vacationing: !localData.is_vacationing });
    saveMentorData({ ...mentor, is_vacationing: !localData.is_vacationing });
  };

  const handleRegionChange = (value: string) =>
    updateMentorData('region', value);

  const handleStatusMessageChange = (value: string) =>
    updateMentorData('status_message', value);

  const handleStoryChange = (value: string) => updateMentorData('story', value);

  return (
    <Container>
      <Text variant="h2">{t('public.title')}</Text>
      <SaveNotice>{t('public.mentor.saveNotice')}</SaveNotice>
      <Form>
        <Text>{t('public.mentor.mandatoryNotice')}</Text>
        <Columns>
          <Column>
            <LabeledInput
              label={t('public.mentor.displayName')}
              onChange={handleDisplayNameChange}
              value={localData.display_name}
            />
            <LabeledInput
              label={t('public.mentor.birthYear')}
              onChange={handleBirthYearChange}
              value={String(localData.birth_year)}
              type="number"
            />
            <LabeledInput
              label={t('public.mentor.region')}
              onChange={handleRegionChange}
              value={localData.region}
            />
          </Column>
          <Column>
            <LabeledInput
              label={t('public.mentor.statusMessage')}
              onChange={handleStatusMessageChange}
              value={localData.status_message}
            />
            <Text variant="label">{t('public.mentor.vacation.title')}</Text>
            <Slider
              id="isVacationing"
              label={t(
                `public.mentor.vacation.switch.${
                  localData.is_vacationing ? 'on' : 'off'
                }`,
              )}
              onChange={handleIsVacationingChange}
              value={localData.is_vacationing}
            />
            <Text variant="blueBox">{t('public.mentor.vacation.info')}</Text>
          </Column>
        </Columns>
        <Text variant="label">{t('public.mentor.story')}</Text>
        <StoryInput
          variant="textarea"
          onChange={handleStoryChange}
          rows={4}
          value={localData.story}
        />
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
      </Form>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex: 2;
  flex-direction: column;
  padding: 3rem 0;
`;

const SaveNotice = styled(Text)`
  align-items: center;
  background-color: ${palette.blue3};
  display: flex;
  height: 2.5rem;
  justify-content: center;
  width 100%;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
`;

const Columns = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StoryInput = styled(TextInput)`
  margin-top: 0.5rem;
`;

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

export default PublicInfo;

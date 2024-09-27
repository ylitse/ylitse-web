import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectMentor, selectUser } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';
import { useUpdateMentorMutation } from '@/features/MentorPage/mentorPageApi';
import { useUpdateUserMutation } from '@/features/Authentication/authenticationApi';

import { ButtonRow } from '.';
import { DEFAULT_ICON_SIZE, palette } from '@/components/constants';
import LabeledInput from '@/components/LabeledInput';
import Slider from '@/components/Slider';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';
import TextInput from '@/components/TextInput';
import { validateBirthYear, validateDisplayNameLength } from '../validators';

import type { ApiMentor } from '@/features/MentorPage/mentorPageApi';

const PublicInfo = () => {
  const { t } = useTranslation('profile');
  const user = useAppSelector(selectUser);
  const mentor = useAppSelector(selectMentor);
  const [updateMentor, { isLoading: isLoadingMentor }] =
    useUpdateMentorMutation();
  const [updateUser, { isLoading: isLoadingUser }] = useUpdateUserMutation();

  const [localData, setLocalData] = useState<ApiMentor>(mentor);
  const [isDirty, setIsDirty] = useState(false);
  const [skillSearchValue, setSkillSearchValue] = useState('');

  const updateMentorData = <K extends keyof ApiMentor>(
    key: K,
    value: ApiMentor[K],
  ) => {
    setLocalData({ ...localData, [key]: value });
    setIsDirty(true);
  };

  const discardChanges = () => {
    setLocalData(mentor);
    setIsDirty(false);
  };

  const saveMentorData = async () => {
    try {
      // Only update user if display_name has changed
      if (localData.display_name !== mentor.display_name) {
        await updateUser({
          ...user,
          display_name: localData.display_name,
        }).unwrap();
      }
      await updateMentor(localData).unwrap();
      setIsDirty(false);
    } catch (err) {
      return;
    }
  };

  const isLoading = isLoadingMentor || isLoadingUser;

  const isDisplayNameTooShort = !validateDisplayNameLength(
    localData.display_name,
  );
  const isBirthYearInvalid = !validateBirthYear(localData.birth_year);

  const isDiscardingDisabled = !isDirty || isLoading;
  const isSavingDisabled =
    !isDirty || isBirthYearInvalid || isDisplayNameTooShort || isLoading;

  return (
    <Container>
      <Text variant="h2">{t('public.title')}</Text>
      <Buttons>
        <TextButton
          isDisabled={isDiscardingDisabled}
          onClick={discardChanges}
          variant={isDiscardingDisabled ? 'disabledOutline' : 'outlinePurple'}
        >
          {t('public.mentor.discardChanges')}
        </TextButton>
        <TextButton
          isDisabled={isSavingDisabled}
          onClick={saveMentorData}
          variant={isSavingDisabled ? 'disabled' : 'dark'}
        >
          {t('public.mentor.save')}
        </TextButton>
      </Buttons>
      <Form>
        <Text>{t('public.mentor.mandatoryNotice')}</Text>
        <Columns>
          <Column>
            <LabeledInput
              error={
                isDisplayNameTooShort
                  ? t('public.mentor.displayName.tooShortError')
                  : null
              }
              label={t('public.mentor.displayName.label')}
              onChange={value => updateMentorData('display_name', value)}
              value={localData.display_name}
            />
            <LabeledInput
              error={
                isBirthYearInvalid
                  ? t('public.mentor.birthYear.invalidError')
                  : null
              }
              label={t('public.mentor.birthYear.label')}
              onChange={value => updateMentorData('birth_year', Number(value))}
              value={String(localData.birth_year)}
              type="number"
            />
            <LabeledInput
              label={t('public.mentor.region')}
              onChange={value => updateMentorData('region', value)}
              value={localData.region}
            />
          </Column>
          <Column>
            <LabeledInput
              label={t('public.mentor.statusMessage')}
              onChange={value => updateMentorData('status_message', value)}
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
              onChange={() =>
                updateMentorData('is_vacationing', !localData.is_vacationing)
              }
              value={localData.is_vacationing}
            />
            <Text variant="blueBox">{t('public.mentor.vacation.info')}</Text>
          </Column>
        </Columns>
        <Text variant="label">{t('public.mentor.story')}</Text>
        <StoryInput
          variant="textarea"
          onChange={value => updateMentorData('story', value)}
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

const Buttons = styled(ButtonRow)`
  background-color: ${palette.blue3};
  margin-top: 1rem;
  padding: 1.5rem;
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

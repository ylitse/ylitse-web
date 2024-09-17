import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  selectMentor,
  selectUser,
  setMentor,
  setUser,
} from '@/features/Authentication/userSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { useDebounce } from '@/hooks/useDebounce';

import {
  DEFAULT_ICON_SIZE,
  palette,
  SAVE_DELAY_MS,
} from '@/components/constants';
import LabeledInput from '@/components/LabeledInput';
import Slider from '@/components/Slider';
import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import {
  useUpdateMentorMutation,
  useUpdateUserMutation,
} from '../profilePageApi';

import type { Mentor, User } from '@/features/Authentication/authenticationApi';

const PublicInfo = () => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const mentor = useAppSelector(selectMentor);
  const [updateUser, { isError: isUserError, isSuccess: isUserSuccess }] =
    useUpdateUserMutation();
  const [updateMentor, { isError: isMentorError, isSuccess: isMentorSuccess }] =
    useUpdateMentorMutation();

  const [birthYear, setBirthYear] = useState(String(mentor.birth_year));
  const [displayName, setDisplayName] = useState(mentor.display_name);
  const [isAbsent, setIsAbsent] = useState(mentor.is_vacationing);
  const [region, setRegion] = useState(mentor.region);
  const [status, setStatus] = useState(mentor.status_message);
  const [story, setStory] = useState(mentor.story);
  const [topicSearchValue, setTopicSearchValue] = useState('');

  const toggleIsAbsent = () => setIsAbsent(!isAbsent);

  const userToSave: User = {
    ...user,
    display_name: displayName,
  };

  const mentorToSave: Mentor = {
    ...mentor,
    birth_year: Number(birthYear),
    display_name: displayName,
    is_vacationing: isAbsent,
    region,
    status_message: status,
    story,
  };

  useEffect(() => {
    if (isUserError || isMentorError) {
      // TODO: Show error notification
    }
  }, [isUserError, isMentorError]);

  useEffect(() => {
    if (isUserSuccess) dispatch(setUser(userToSave));
  }, [isUserSuccess]);

  useEffect(() => {
    if (isMentorSuccess) {
      dispatch(setMentor(mentorToSave));
      // TODO: Show success notification
    }
  }, [isMentorSuccess]);

  const saveMentor = useDebounce(
    () => updateMentor(mentorToSave),
    SAVE_DELAY_MS,
  );

  const saveUserAndMentor = useDebounce(() => {
    updateUser(userToSave);
    updateMentor(mentorToSave);
  }, SAVE_DELAY_MS);

  useEffect(() => {
    if (Number(birthYear) !== mentor.birth_year) saveMentor();
    if (displayName !== mentor.display_name) saveUserAndMentor();
    if (isAbsent !== mentor.is_vacationing) saveMentor();
    if (region !== mentor.region) saveMentor();
    if (status !== mentor.status_message) saveMentor();
    if (story !== mentor.story) saveMentor();
  }, [birthYear, displayName, isAbsent, region, status, story]);

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
              onChange={setDisplayName}
              value={displayName}
            />
            <LabeledInput
              label={t('public.mentor.birthYear')}
              onChange={setBirthYear}
              value={String(birthYear)}
              type="number"
            />
            <LabeledInput
              label={t('public.mentor.region')}
              onChange={setRegion}
              value={region}
            />
          </Column>
          <Column>
            <LabeledInput
              label={t('public.mentor.status')}
              onChange={setStatus}
              value={status}
            />
            <Text variant="label">{t('public.mentor.absence.title')}</Text>
            <Slider
              id="isAbsent"
              label={t(
                `public.mentor.absence.switch.${isAbsent ? 'on' : 'off'}`,
              )}
              onChange={toggleIsAbsent}
              value={isAbsent}
            />
            <Text variant="blueBox">{t('public.mentor.absence.info')}</Text>
          </Column>
        </Columns>
        <Text variant="label">{t('public.mentor.story')}</Text>
        <StoryInput
          variant="textarea"
          onChange={setStory}
          rows={4}
          value={story}
        />
        <Label variant="label">{t('public.mentor.topics')}</Label>
        <SearchBar>
          <TopicSearch
            variant="iconInput"
            color={topicSearchValue ? 'blueDark' : 'greyFaded'}
            leftIcon={{
              sizeInPx: DEFAULT_ICON_SIZE.SMALL,
              variant: 'search',
            }}
            onChange={setTopicSearchValue}
            placeholder={t('public.mentor.addTopic')}
            value={topicSearchValue}
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

const TopicSearch = styled(TextInput)`
  max-width: 350px;

  &:focus {
    outline: 1px solid ${palette.purple};
  }
`;

export default PublicInfo;

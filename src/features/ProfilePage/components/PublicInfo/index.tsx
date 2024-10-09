import styled, { css } from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectMentor, selectUser } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';
import { useUpdateMentorMutation } from '@/features/MentorPage/mentorPageApi';
import { useUpdateUserMutation } from '@/features/Authentication/authenticationApi';

import { ButtonRow } from '..';
import Columns from './Columns';
import { palette } from '@/components/constants';
import SkillsEditor from '../SkillsEditor';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';
import TextInput from '@/components/TextInput';
import {
  validateBirthYear,
  validateDisplayNameLength,
} from '@/features/ProfilePage/validators';

import type { ApiMentor } from '@/features/MentorPage/mentorPageApi';

type Props = {
  isMobile?: boolean;
};

const PublicInfo = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('profile');
  const user = useAppSelector(selectUser);
  const mentor = useAppSelector(selectMentor);
  const [updateMentor, { isLoading: isLoadingMentor }] =
    useUpdateMentorMutation();
  const [updateUser, { isLoading: isLoadingUser }] = useUpdateUserMutation();

  const [localData, setLocalData] = useState<ApiMentor>(mentor);
  const [isDirty, setIsDirty] = useState(false);

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
    <Container isMobile={isMobile}>
      <Header isMobile={isMobile} variant="h2">
        {t('public.title')}
      </Header>
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
        <Columns
          isBirthYearInvalid={isBirthYearInvalid}
          isDisplayNameTooShort={isDisplayNameTooShort}
          isMobile={isMobile}
          mentor={localData}
          updateMentor={updateMentorData}
        />
        <Text variant="label">{t('public.mentor.story')}</Text>
        <StoryInput
          variant="textarea"
          onChange={value => updateMentorData('story', value)}
          rows={4}
          value={localData.story}
        />
        <SkillsEditor
          updateSkills={skills => updateMentorData('skills', skills)}
          skills={localData.skills}
        />
      </Form>
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    isMobile
      ? css`
          box-sizing: border-box;
          display: flex;
          flex: 2;
          flex-direction: column;
        `
      : css`
          background-color: ${palette.white};
          border-radius: 10px;
          box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
          box-sizing: border-box;
          display: flex;
          flex: 2;
          flex-direction: column;
          padding: 2rem 0 4rem;
        `}
`;

const Header = styled(Text)<{ isMobile: boolean }>`
  align-self: ${({ isMobile }) => (isMobile ? 'flex-start' : 'center')};
  padding: 0 3rem;
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

const StoryInput = styled(TextInput)`
  margin-top: 0.5rem;
`;

export default PublicInfo;

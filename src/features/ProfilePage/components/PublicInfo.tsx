import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectUserInfo } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';

import { DEFAULT_ICON_SIZE, palette } from '@/components/constants';
import LabeledInput from '@/components/LabeledInput';
import Slider from '@/components/Slider';
import Text from '@/components/Text';
import TextInput from '@/components/TextInput';

const PublicInfo = () => {
  const { t } = useTranslation('profile');
  const userInfo = useAppSelector(selectUserInfo);

  const [displayName, setDisplayName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [story, setStory] = useState('');
  const [topicSearchValue, setTopicSearchValue] = useState('');

  const toggleIsActive = () => setIsActive(isActive => !isActive);

  useEffect(() => {
    const { displayName, active } = userInfo;
    if (displayName !== null) setDisplayName(displayName);
    if (isActive !== null) setIsActive(active);
  }, [userInfo]);

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
              value={birthYear}
            />
            <LabeledInput
              label={t('public.mentor.area')}
              onChange={setArea}
              value={area}
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
                `public.mentor.absence.switch.${isActive ? 'off' : 'on'}`,
              )}
              onChange={toggleIsActive}
              value={!isActive}
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

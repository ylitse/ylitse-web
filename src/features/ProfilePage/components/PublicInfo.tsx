import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import LabeledInput from '@/components/LabeledInput';
import { palette } from '@/components/variables';
import Text from '@/components/Text';
import TextInput from '@/components/TextInput';

const searchInputIconSize = 24;

const PublicInfo = () => {
  const { t } = useTranslation('profile');

  const [displayName, setDisplayName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('');
  const [story, setStory] = useState('');
  const [topicSearchValue, setTopicSearchValue] = useState('');

  const updateDisplayName = (displayName: string) =>
    setDisplayName(displayName);
  const updateBirthYear = (birthYear: string) => setBirthYear(birthYear);
  const updateArea = (area: string) => setArea(area);
  const updateStatus = (status: string) => setStatus(status);
  const updateStory = (story: string) => setStory(story);

  return (
    <Container>
      <Text variant="h2">{t('public.title')}</Text>
      <SaveNotice>{t('public.mentor.saveNotice')}</SaveNotice>
      <Form>
        <Text>{t('public.mentor.mandatoryNotice')}</Text>
        <LabeledInput
          label={t('public.displayName')}
          onChange={updateDisplayName}
          value={displayName}
        />
        <LabeledInput
          label={t('public.mentor.birthYear')}
          onChange={updateBirthYear}
          value={birthYear}
        />
        <LabeledInput
          label={t('public.mentor.area')}
          onChange={updateArea}
          value={area}
        />
        <LabeledInput
          label={t('public.mentor.status')}
          onChange={updateStatus}
          value={status}
        />
        <Text variant="label">{t('public.mentor.absence.title')}</Text>
        <Text>{t('public.mentor.absence.info')}</Text>
        <Text variant="label">{t('public.mentor.story')}</Text>
        <TextInput variant="textarea" onChange={updateStory} value={story} />
        <Text variant="label">{t('public.mentor.topics')}</Text>
        <TopicSearch
          variant="iconInput"
          color={topicSearchValue ? 'blueDark' : 'greyFaded'}
          leftIcon={{
            sizeInPx: searchInputIconSize,
            variant: 'search',
          }}
          onChange={setTopicSearchValue}
          placeholder={t('public.mentor.addTopic')}
          value={topicSearchValue}
        />
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

const TopicSearch = styled(TextInput)`
  flex: 1;
  max-width: 400px;
  &:focus {
    outline: 1px solid ${palette.purple};
  }
`;

export default PublicInfo;

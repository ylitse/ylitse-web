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
  const [isAbsent, setIsAbsent] = useState<boolean>(true);
  const [story, setStory] = useState('');
  const [topicSearchValue, setTopicSearchValue] = useState('');

  const updateDisplayName = (displayName: string) =>
    setDisplayName(displayName);
  const updateBirthYear = (birthYear: string) => setBirthYear(birthYear);
  const updateArea = (area: string) => setArea(area);
  const updateStatus = (status: string) => setStatus(status);
  const toggleIsAbsent = () => setIsAbsent(isAbsent => !isAbsent);
  const updateStory = (story: string) => setStory(story);

  return (
    <Container>
      <Text variant="h2">{t('public.title')}</Text>
      <SaveNotice>{t('public.mentor.saveNotice')}</SaveNotice>
      <Form>
        <Text>{t('public.mentor.mandatoryNotice')}</Text>
        <DoubleColumn>
          <Column>
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
          </Column>
          <Column>
            <LabeledInput
              label={t('public.mentor.status')}
              onChange={updateStatus}
              value={status}
            />
            <Text variant="label">{t('public.mentor.absence.title')}</Text>
            <Row>
              <AbsenceSwitch
                id="isAbsent"
                type="checkbox"
                checked={isAbsent}
                onChange={toggleIsAbsent}
              />
              <Text inputId="isAbsent" variant="label">
                {t(`public.mentor.absence.switch.${isAbsent ? 'on' : 'off'}`)}
              </Text>
            </Row>
            <Text variant="blueBox">{t('public.mentor.absence.info')}</Text>
          </Column>
        </DoubleColumn>
        <Text variant="label">{t('public.mentor.story')}</Text>
        <StoryInput
          variant="textarea"
          onChange={updateStory}
          rows={4}
          value={story}
        />
        <Label variant="label">{t('public.mentor.topics')}</Label>
        <SearchBar>
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

const DoubleColumn = styled.div`
  display: flex;
  gap: 3rem;
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const AbsenceSwitch = styled.input``;

// const Slider = styled.span``;

// /* The switch - the box around the slider */
// .switch {
//   position: relative;
//   display: flex;
//   width: 60px;
//   height: 30px;
// }

// /* Hide default HTML checkbox */
// .switch input {
//   opacity: 0;
//   width: 0;
//   height: 0;
// }

// /* The slider */
// .slider {
//   border: 2px solid;
//   border-color: #616161;
//   border-radius: 20px;
//   position: absolute;
//   cursor: pointer;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: white;
//   -webkit-transition: 0.4s;
//   transition: 0.4s;
// }

// .slider:before {
//   background-color: #616161;
//   border-radius: 50%;
//   position: absolute;
//   content: '';
//   height: 22px;
//   width: 22px;
//   left: 4px;
//   bottom: 2px;
//   -webkit-transition: 0.2s;
//   transition: 0.2s;
// }

// input:checked + .slider {
//   border-color: #4a2acb;
// }

// input:checked + .slider:before {
//   background-color: #4a2acb;
//   -webkit-transform: translateX(26px);
//   -ms-transform: translateX(26px);
//   transform: translateX(26px);
// }

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
  margin-left: -${searchInputIconSize}px;
  margin-top: 1rem;
`;

const TopicSearch = styled(TextInput)`
  max-width: 350px;

  &:focus {
    outline: 1px solid ${palette.purple};
  }
`;

export default PublicInfo;

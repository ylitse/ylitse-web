import { useAppDispatch, useAppSelector } from '@/store';
import {
  changeSearchString,
  selectSearchString,
} from '@/features/MentorPage/mentorsFilterSlice';

import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import SearchBar from '@/components/SearchBar';
import { IconButton } from '@/components/Buttons';

type Props = {
  isSkillFilterExpanded: boolean;
};

const MentorSearch = ({ isSkillFilterExpanded }: Props) => {
  const { t } = useTranslation('mentors');
  const buttonText = isSkillFilterExpanded ? 'filters.close' : 'filters.show';

  const searchString = useAppSelector(selectSearchString);
  const dispatch = useAppDispatch();

  const handleSearchStringChange = (value: string) =>
    dispatch(changeSearchString(value));

  return (
    <Container>
      <SearchBar
        placeholder={t('filters.search')}
        value={searchString}
        onChange={handleSearchStringChange}
      />
      <IconButton
        variant="filter"
        sizeInPx={20}
        text={{
          color: 'purple',
          text: t(buttonText),
          variant: 'bold',
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin: auto;
  max-width: 90%;
  width: 90%;
`;

export default MentorSearch;

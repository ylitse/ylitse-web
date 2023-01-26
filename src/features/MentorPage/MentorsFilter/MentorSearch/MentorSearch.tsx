import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store';

import { changeSearchString, selectSearchString } from '../mentorsFilterSlice';
import { palette } from '@/components/variables';
import SearchBar from '@/components/SearchBar';
import Text from '@/components/Text';

export const MentorSearch = () => {
  const searchString = useAppSelector(selectSearchString);

  const dispatch = useAppDispatch();
  const { t } = useTranslation('mentors');

  const handleSearchStringChange = (value: string) =>
    dispatch(changeSearchString(value));

  return (
    <Container>
      <InfoText variant="p">{t('filters.description')}</InfoText>
      <SearchBar
        placeholder={t('filters.search')}
        value={searchString}
        onChange={handleSearchStringChange}
      />
    </Container>
  );
};

const InfoText = styled(Text)`
  color: ${palette.darkblue};
  flex: 0 0 auto;
  padding-right: 5%;
  width: 47%;
`;

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin: auto;
  max-width: 90%;
  padding: 2rem 0;
  width: 90%;
`;

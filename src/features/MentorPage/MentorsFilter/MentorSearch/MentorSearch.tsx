import styled from 'styled-components';
import { palette, basicSourceSansText } from '@/components/variables';
import SearchBar from '@/components/SearchBar';
import { selectSearchString, changeSearchString } from '../mentorsFilterSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { useTranslation } from 'react-i18next';

export const MentorSearch = () => {
  const searchString = useAppSelector(selectSearchString);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleSearchStringChange = (value: string) =>
    dispatch(changeSearchString(value));

  return (
    <Container>
      <InfoText>{t('mentorPage.filters.description')}</InfoText>
      <SearchBar
        placeholder={t('mentorPage.filters.search')}
        value={searchString}
        onChange={handleSearchStringChange}
      />
    </Container>
  );
};

const InfoText = styled.div`
  flex: 0 0 auto;
  color: ${palette.darkblue};
  ${basicSourceSansText};
  font-weight: 400;
  font-size: 1.25rem;
  width: 47%;
  padding-right: 5%;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 2rem 0;
  width: 90%;
  max-width: 90%;
  margin: auto;
`;

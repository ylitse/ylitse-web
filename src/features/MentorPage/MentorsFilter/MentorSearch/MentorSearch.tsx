import styled from 'styled-components';
import * as cssVariables from '../../../../components/variables';
import SearchBar from '../../../../components/SearchBar';
import { selectSearchString, changeSearchString } from '../mentorsFilterSlice';
import { useAppDispatch, useAppSelector } from '../../../../store';

/**
 * Div under the "Mentorit" -header where info about mentorsearch
 * is shown, also contains searchBar in separate MentorSearch component
 */

const placeholder = 'Etsi mentoria';
export const MentorSearch = () => {
  const searchString = useAppSelector(selectSearchString);

  const dispatch = useAppDispatch();

  const handleSearchStringChange = (value: string) =>
    dispatch(changeSearchString(value));

  return (
    <Container>
      <InfoText>
        Tervetuloa selaamaan mentoreiden profiileja! Löydät uusimmat mentorit
        listassa ensimmäisenä. Hakutoimintoa käyttämällä voit rajata mentoreita
        ongelmasi perusteella
      </InfoText>
      <SearchBar
        placeholder={placeholder}
        value={searchString}
        onChange={handleSearchStringChange}
      />
    </Container>
  );
};

const InfoText = styled.div`
  flex: 0 0 auto;
  color: ${cssVariables.palette.darkblue};
  ${cssVariables.basicSourceSansText};
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

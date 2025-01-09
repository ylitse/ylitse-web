import { useAppDispatch, useAppSelector } from '@/store';
import {
  resetSearch,
  selectSelectedSkills,
} from '@/features/MentorPage/mentorsFilterSlice';

import { useTranslation, Trans } from 'react-i18next';

import styled from 'styled-components';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/Buttons';
import { palette } from '@/components/constants';
import Text from '@/components/Text';
import { IconButton } from '@/components/Buttons';

type Props = {
  isExpanded: boolean;
  toggleExpanded: (next: boolean) => void;
  searchString: string;
  onSearchStringChange: (value: string) => void;
};

const MentorSearch = ({
  isExpanded,
  toggleExpanded,
  searchString,
  onSearchStringChange,
}: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('mentors');
  const buttonText = isExpanded ? 'filters.close' : 'filters.show';

  const selectedSkills = useAppSelector(selectSelectedSkills);

  const shouldShowFilterBall = !isExpanded && selectedSkills.length > 0;

  const shouldShowResetButton = searchString !== '';

  const handleReset = () => {
    dispatch(resetSearch());
  };

  return (
    <>
      <SearchHeader variant="h1">{t('filters.title')}</SearchHeader>
      <Instructions>
        <Text variant="p">
          <Trans t={t} i18nKey="filters.instructions" />
        </Text>
      </Instructions>
      <Container>
        <SearchBarContainer>
          <NarrowSearchBar
            placeholder={t('filters.search')}
            value={searchString}
            onChange={onSearchStringChange}
            variant="normal"
          />
          {shouldShowResetButton && (
            <ResetSearch>
              <IconButton
                onClick={handleReset}
                variant="closeWithBackground"
                sizeInPx={32}
              />
            </ResetSearch>
          )}
        </SearchBarContainer>
        <Anchor>
          <Button
            onClick={() => toggleExpanded(!isExpanded)}
            leftIcon={isExpanded ? 'close' : 'filter'}
            sizeInPx={isExpanded ? 16 : 20}
            text={{
              color: 'purple',
              text: t(buttonText),
              variant: 'boldBaloo',
            }}
          />
          {shouldShowFilterBall && (
            <Ball>
              <Text variant="bold">{selectedSkills.length}</Text>
            </Ball>
          )}
        </Anchor>
      </Container>
    </>
  );
};

const SearchHeader = styled(Text)`
  text-align: center;
`;

const Instructions = styled.div`
  margin: auto;
  max-width: 58%;
  text-align: center;
  width: 58%;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin: auto;
  max-width: 90%;
  width: 90%;
`;

const Anchor = styled.div`
  display: flex;
  position: relative;
`;

const Ball = styled.div`
  align-items: center;
  background: ${palette.blue2};
  border-radius: 50%;
  box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
  display: flex;
  height: 20px;
  justify-content: center;
  left: -0.75rem;
  padding: 0.1rem;
  position: absolute;
  top: 0.25rem;
  width: 20px;
  z-index: 20;
`;

const SearchBarContainer = styled.div`
  align-items: center;
  display: flex;
  padding-left: 12%;
  width: 44%;
`;

const NarrowSearchBar = styled(SearchBar)`
  flex: 1;
  z-index: 1;
`;

const ResetSearch = styled.div`
  margin-left: -2.5rem;
  z-index: 2;
`;

export default MentorSearch;

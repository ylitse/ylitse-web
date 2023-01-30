import { useAppDispatch, useAppSelector } from '@/store';
import {
  changeSearchString,
  selectSelectedSkills,
  selectSearchString,
} from '@/features/MentorPage/mentorsFilterSlice';

import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import SearchBar from '@/components/SearchBar';
import { IconButton } from '@/components/Buttons';
import { palette } from '@/components/variables';
import Text from '@/components/Text';

type Props = {
  isExpanded: boolean;
  toggleExpanded: (next: boolean) => void;
};

const MentorSearch = ({ isExpanded, toggleExpanded }: Props) => {
  const { t } = useTranslation('mentors');
  const buttonText = isExpanded ? 'filters.close' : 'filters.show';

  const searchString = useAppSelector(selectSearchString);
  const selectedSkills = useAppSelector(selectSelectedSkills);
  const dispatch = useAppDispatch();

  const handleSearchStringChange = (value: string) =>
    dispatch(changeSearchString(value));

  const shouldShowFilterBall = !isExpanded && selectedSkills.length > 0;

  return (
    <Container>
      <SearchBar
        placeholder={t('filters.search')}
        value={searchString}
        onChange={handleSearchStringChange}
      />
      <Anchor>
        <IconButton
          onClick={() => toggleExpanded(!isExpanded)}
          variant={isExpanded ? 'closeOutlined' : 'filter'}
          sizeInPx={isExpanded ? 16 : 20}
          text={{
            color: 'purple',
            text: t(buttonText),
            variant: 'bold',
          }}
        />
        {shouldShowFilterBall && (
          <Ball>
            <Text variant="bold">{selectedSkills.length}</Text>
          </Ball>
        )}
      </Anchor>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 2.5rem;
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

export default MentorSearch;

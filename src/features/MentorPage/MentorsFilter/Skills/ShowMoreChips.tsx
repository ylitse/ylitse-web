import styled from 'styled-components';
import ExpandIcon from '../../../../static/img/icon-expand.svg';
import * as cssVariables from '../../../../components/variables';

type Props = {
  setShouldShowAllSkills: () => void;
  shouldShowAllSkills: boolean;
};

const ShowMoreChips = ({
  setShouldShowAllSkills,
  shouldShowAllSkills,
}: Props) => {
  const buttonText = shouldShowAllSkills
    ? 'Näytä vähemmän'
    : 'Näytä kaikki aiheet';

  return (
    <MoreContainer onClick={setShouldShowAllSkills}>
      <MoreIcon />
      <ShowMoreButton>{buttonText}</ShowMoreButton>
    </MoreContainer>
  );
};

const MoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  position: absolute;
  width: fit-content;
  bottom: 2rem;
`;

const MoreIcon = styled.div`
  background-image: url(${ExpandIcon});
  background-size: contain;
  background-repeat: no-repeat;
  height: 2rem;
  width: 2rem;
  flex: 0 0 2rem;
  display: flex;
  position: absolute;
  left: -2rem;
`;

const ShowMoreButton = styled.button`
  ${cssVariables.basicBalooText};
  font-weight: 700;
  font-size: 18px;
  border: none;
  background-color: transparent;
  color: ${cssVariables.palette.purple};
  line-height: 2rem;
`;

export default ShowMoreChips;

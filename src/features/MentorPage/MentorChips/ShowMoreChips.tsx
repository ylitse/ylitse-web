import styled from 'styled-components';
import ExpandIcon from '../../../static/img/icon-expand.svg';

/**
 * Show more button style and layout
 * Should update Skill Chips container when pressed?
 */

const ShowMoreButtonHandler = () => {
  const showMoreButton = document.getElementById('skill-chips');
  if (showMoreButton) {
    showMoreButton.classList.toggle('show-more');
  }
};

const ShowMoreChips = () => {
  return (
    <>
      <MoreContainer>
        <MoreIcon />
        <ShowMoreButton onClick={ShowMoreButtonHandler}>
          Näytä kaikki aiheet
        </ShowMoreButton>
      </MoreContainer>
    </>
  );
};

const MoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  position: absolute;
  width: fit-content;
  bottom: 3rem;
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
  font-family: 'Baloo 2', cursive;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  border: none;
  background-color: transparent;
  color: #4a2acb;
  line-height: 2rem;
`;

export default ShowMoreChips;

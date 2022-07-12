import styled from 'styled-components';
import ExpandIcon from '@/static/img/icon-expand.svg';

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

const ShowMoreSkills = () => {
  return (
    <>
      <MoreContainer>
        <MoreIcon />
        <ShowMoreButton>Näytä kaikki aiheet</ShowMoreButton>
      </MoreContainer>
    </>
  );
};

export default ShowMoreSkills;

import styled from 'styled-components';
import * as cssVariables from '../../../components/variables';

const ListCardStory = ({ story }: { story: string }) => {
  return (
    <>
      <cssVariables.heading3_dark style={{ margin: 0 }}>
        Tarinani
      </cssVariables.heading3_dark>
      <TruncatedMultiline>{story}</TruncatedMultiline>
    </>
  );
};

const TruncatedMultiline = styled.p`
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
  color: ${cssVariables.palette.darkblue};
  width: 100%;
  height: 6rem;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

export default ListCardStory;

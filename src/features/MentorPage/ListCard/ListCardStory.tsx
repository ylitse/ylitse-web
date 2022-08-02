import styled from 'styled-components';
import * as cssVariables from '../../../static/styles/variables';

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
  width: calc(24vw - 3.8rem);
  height: 6rem;
  position: relative;
  overflow: hidden;
  &:after {
    position: absolute;
    display: block;
    width: 3rem;
    height: 1.5rem;
    content: '...';
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: white;
  }
`;

export default ListCardStory;

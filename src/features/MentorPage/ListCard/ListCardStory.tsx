import styled from 'styled-components';
import { Text } from '../../../components/Text/Text';
import * as cssVariables from '../../../components/variables';

const ListCardStory = ({ story }: { story: string }) => {
  return (
    <>
      <Text variant="h3" style={{ margin: 0 }}>
        Tarinani
      </Text>
      <TruncatedMultiline>{story}</TruncatedMultiline>
    </>
  );
};

const TruncatedMultiline = styled.p`
  ${cssVariables.basicSourceSansText};
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

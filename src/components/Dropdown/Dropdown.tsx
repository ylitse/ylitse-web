import styled from 'styled-components';
import { useComponentVisible } from './useComponentShow';

type Props = {
  button: React.ReactNode;
  content: React.ReactNode;
};

export const Dropwdown: React.FC<Props> = ({ button, content }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  return (
    <Container>
      <ExpandButton ref={ref} onClick={() => setIsComponentVisible(true)}>
        {button}
      </ExpandButton>
      {isComponentVisible && content}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const ExpandButton = styled.button`
  all: unset;
  cursor: pointer;
`;

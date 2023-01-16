import styled from 'styled-components';
import { palette } from '@/components/variables';

const ChatWindow = () => {
  return (
    <Container>
      <h1>ChatWindow</h1>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.white};
`;

export default ChatWindow;

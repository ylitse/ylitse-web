import styled from 'styled-components';
import { palette } from '@/components/variables';

const ChatMenu = () => {
  return (
    <Container>
      <h1>ChatMenu</h1>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.white};
  width: 407px;
`;

export default ChatMenu;

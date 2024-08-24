import { palette } from '../variables';
import { Toaster, resolveValue, toast } from 'react-hot-toast';
import styled from 'styled-components';

const AppToaster = () => {
  return (
    <Toaster>
      {t => (
        <Container isVisible={t.visible}>
          {resolveValue(t.message, t)}
          <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
        </Container>
      )}
    </Toaster>
  );
};

const Container = styled.div<{ isVisible: boolean }>`
  background-color: ${palette.white};
  border: solid 1px ${palette.red};
  flex: 0 0 auto;
  height: 2rem;
  line-height: 1rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  padding: 0.5rem 1rem;
`;

export default AppToaster;

import styled from 'styled-components';

import Text from '../Text';
import WarningIcon from '@/static/icons/warning-with-background.svg';

type Props = {
  text: string;
};

export const InputErrorMessage = ({ text }: Props) => (
  <Container>
    <img src={WarningIcon} />
    <Text color="redDark" variant="error">
      {text}
    </Text>
  </Container>
);

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

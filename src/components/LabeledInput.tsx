import styled from 'styled-components';

import { createUniqueId } from '@/utils/id';
import Text from './Text';
import TextInput from './TextInput';

type LabeledInputProps = {
  label: string;
  onChange: (value: string) => void;
  value: string;
};

const LabeledInput = ({
  label,
  onChange,
  value,
}: LabeledInputProps): JSX.Element => {
  const inputId = createUniqueId();

  return (
    <Container>
      <Text inputId={inputId} variant="label">
        {label}
      </Text>
      <Input
        id={inputId}
        variant="formInput"
        onChange={onChange}
        value={value}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled(TextInput)`
  margin-top: 0.5rem;
`;

export default LabeledInput;

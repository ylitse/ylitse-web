import styled from 'styled-components';
import Text from '../Text';
import TextInput from '../TextInput';

type Props = {
  label: string;
  onChange: (value: string) => void;
  value: string;
};

const PasswordInput = ({ label, onChange, value }: Props): JSX.Element => {
  const inputId = Math.random().toString();

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

export default PasswordInput;

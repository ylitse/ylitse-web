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
  return (
    <>
      <Text>{label}</Text>
      <TextInput onChange={onChange} value={value} />
    </>
  );
};

export default LabeledInput;

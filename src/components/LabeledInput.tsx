import styled from 'styled-components';

import { createUniqueId } from '@/utils/id';
import Text from './Text';
import TextInput from './TextInput';
import Tooltip from './Tooltip';

type LabeledInputProps = {
  label: string;
  onChange: (value: string) => void;
  tooltip?: string;
  value: string;
};

const LabeledInput = ({
  label,
  onChange,
  tooltip,
  value,
}: LabeledInputProps): JSX.Element => {
  const inputId = `labeled_input_${createUniqueId()}`;

  return (
    <Container>
      <LabelRow>
        <Text inputId={inputId} variant="label">
          {label}
        </Text>
        {tooltip && <Tooltip text={tooltip} />}
      </LabelRow>
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

const LabelRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-right: 0.5rem;
`;

const Input = styled(TextInput)`
  margin-top: 0.5rem;
`;

export default LabeledInput;

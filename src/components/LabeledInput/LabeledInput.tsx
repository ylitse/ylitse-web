import styled from 'styled-components';

import { createUniqueId } from '@/utils/id';
import InputErrorMessage from '../InputErrorMessage';
import Text from '../Text';
import TextInput from '../TextInput';
import Tooltip from '../Tooltip';

import type { InputType } from '../TextInput/TextInput';

type Props = {
  error?: string | null;
  label: string;
  onChange: (value: string) => void;
  tooltip?: string;
  type?: InputType;
  value: string;
};

export const LabeledInput = ({
  error,
  label,
  onChange,
  tooltip,
  type = 'text',
  value,
}: Props): JSX.Element => {
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
        isError={!!error}
        onChange={onChange}
        type={type}
        value={value}
      />
      {!!error && <InputErrorMessage text={error} />}
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

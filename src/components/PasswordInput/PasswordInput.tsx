import styled from 'styled-components';
import { useState } from 'react';

import Text from '../Text';
import { TextButton } from '../Buttons';
import TextInput from '../TextInput';
import Tooltip from '../Tooltip';

type Props = {
  label: string;
  onChange: (value: string) => void;
  showPasswordText: string;
  tooltip?: string;
  value: string;
};

export const PasswordInput = ({
  label,
  onChange,
  showPasswordText,
  tooltip,
  value,
}: Props): JSX.Element => {
  const inputId = Math.random().toString();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <Container>
      <Row>
        <Text inputId={inputId} variant="label">
          {label}
        </Text>
        <RightContainer>
          <TextButton onClick={togglePasswordVisibility} variant="textOnly">
            {showPasswordText}
          </TextButton>
          {tooltip && <Tooltip text={tooltip} />}
        </RightContainer>
      </Row>
      <Input
        id={inputId}
        variant={isPasswordVisible ? 'formInput' : 'password'}
        onChange={onChange}
        value={value}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 1rem;
`;

const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-right: 0.5rem;
`;

const RightContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
`;

const Input = styled(TextInput)`
  margin-top: 0.5rem;
`;

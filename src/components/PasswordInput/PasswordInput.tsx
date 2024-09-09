import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { createUniqueId } from '@/utils/id';
import WarningIcon from '@/static/icons/warning-with-background.svg';
import Text from '../Text';
import { TextButton } from '../Buttons';
import TextInput from '../TextInput';
import Tooltip from '../Tooltip';

type Props = {
  error?: string | null;
  label: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
  tooltip?: string;
  value: string;
};

export const PasswordInput = ({
  error,
  label,
  onBlur,
  onChange,
  tooltip,
  value,
}: Props): JSX.Element => {
  const { t } = useTranslation('common');
  const inputId = `password_input_${createUniqueId()}`;
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const togglePasswordVisibility = () => setIsPasswordHidden(!isPasswordHidden);

  return (
    <Container>
      <LabelRow>
        <Text
          color={error ? 'redDark' : 'blueDark'}
          inputId={inputId}
          variant="label"
        >
          {label}
        </Text>
        <RightContainer>
          <TextButton onClick={togglePasswordVisibility} variant="textOnly">
            {t(`password.${isPasswordHidden ? 'show' : 'hide'}`)}
          </TextButton>
          {tooltip && <Tooltip text={tooltip} />}
        </RightContainer>
      </LabelRow>
      <Input
        id={inputId}
        isError={!!error}
        isPassword={isPasswordHidden}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      />
      {!!error && (
        <Error>
          <img src={WarningIcon} />
          <Text color="redDark" variant="error">
            {error}
          </Text>
        </Error>
      )}
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

const RightContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
`;

const Input = styled(TextInput)`
  margin-top: 0.5rem;
`;

const Error = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

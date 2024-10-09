import styled from 'styled-components';
import { palette } from '../constants';
import Text from '../Text';

type Props = {
  id: string;
  label: string;
  onChange: () => void;
  text: string;
  value: boolean;
};

export const Slider = ({ id, label, onChange, text, value }: Props) => (
  <Container>
    <Text variant="label">{label}</Text>
    <SwitchContainer>
      <Switch>
        <Input id={id} type="checkbox" checked={value} onChange={onChange} />
        <Thumb checked={value} />
      </Switch>
      <Text inputId={id} variant="label">
        {text}
      </Text>
    </SwitchContainer>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const SwitchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const Switch = styled.label`
  cursor: pointer;
  height: 29px;
  position: relative;
  width: 59px;

  input:checked + span {
    &::before {
      transform: translateX(28px);
    }
  }
`;

const Input = styled.input`
  height: 0;
  opacity: 0;
  width: 0;
`;

const Thumb = styled.span<{ checked: boolean }>`
  border: 2px solid
    ${({ checked }) => (checked ? palette.purple : palette.greyFaded)};
  border-radius: 19px;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;

  &::before {
    background-color: ${({ checked }) =>
      checked ? palette.purple : palette.greyFaded};
    border-radius: 50%;
    content: '';
    height: 21px;
    left: 3px;
    position: absolute;
    top: 2px;
    transition: 0.4s;
    width: 21px;
  }
`;

import styled from 'styled-components';
import { palette } from '../constants';
import Text from '../Text';

type Props = {
  id: string;
  label: string;
  onChange: () => void;
  value: boolean;
};

export const Slider = ({ id, label, onChange, value }: Props) => (
  <Container>
    <Switch>
      <Input id={id} type="checkbox" checked={value} onChange={onChange} />
      <Thumb checked={value} />
    </Switch>
    <Text inputId={id} variant="label">
      {label}
    </Text>
  </Container>
);

const Container = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
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

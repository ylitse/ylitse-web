import { palette } from '@/components/variables';
import styled from 'styled-components';

type Props = {
  size: number;
  onClick: (size: number) => void;
  isSelected: boolean;
};

export const PageOption = ({ onClick, isSelected, size }: Props) => (
  <Button onClick={() => onClick(size)} isSelected={isSelected}>
    {size}
  </Button>
);

export const Button = styled.button<{ isSelected?: boolean }>`
  background: transparent;
  background-color: ${palette.white};
  border: none;
  border-left: 2px solid ${palette.purple};
  border-right: 2px solid ${palette.purple};
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  padding: 0 0.5rem;

  &:hover {
    background-color: ${palette.blueLight};
  }
`;

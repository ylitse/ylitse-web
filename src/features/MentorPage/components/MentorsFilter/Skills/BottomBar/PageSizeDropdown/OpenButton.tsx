import { palette } from '@/components/variables';
import styled, { css } from 'styled-components';
import Text from '@/components/Text';
import { Chevron } from '@/components/Icons/Chevron';
import { Button } from './PageOption';

type Props = {
  isComponentVisible: boolean;
  onClick: (next: boolean) => void;
  selected: number;
};

export const OpenButton = ({
  isComponentVisible,
  onClick,
  selected,
}: Props) => (
  <SelectButton
    onClick={() => onClick(!isComponentVisible)}
    isExpanded={isComponentVisible}
  >
    <Text variant="bold" color="purple">
      {selected}
    </Text>
    <Chevron
      variant={isComponentVisible ? 'up' : 'down'}
      color="purple"
      isLarge
    />
  </SelectButton>
);

const SelectButton = styled(Button)<{ isExpanded: boolean }>`
  align-items: center;
  border: none;
  display: flex;

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      border: 2px solid ${palette.purple};
      border-radius: 8px 8px 0 0;
    `}
`;

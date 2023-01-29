import { palette } from '@/components/variables';
import styled from 'styled-components';
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
  <SelectButton onClick={() => onClick(!isComponentVisible)}>
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

const SelectButton = styled(Button)`
  align-items: center;
  border-bottom: 2px solid ${palette.purple};
  border-radius: 8px 8px 0 0;
  border-top: 2px solid ${palette.purple};
  display: flex;
`;

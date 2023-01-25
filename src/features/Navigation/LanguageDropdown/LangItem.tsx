import styled, { css } from 'styled-components';
import { palette } from '@/components/variables';
import Text from '@/components/Text';

export type Props = {
  changeLang: () => void;
  isSelected: boolean;
  text: string;
};

export const LangItem: React.FC<Props> = ({ changeLang, isSelected, text }) => (
  <Button isSelected={isSelected} onClick={changeLang}>
    <Text
      color={isSelected ? 'darkblue' : 'purple'}
      variant={isSelected ? 'linkDisabled' : 'linkBold'}
    >
      {text}
    </Text>
  </Button>
);

const Button = styled.button<{ isSelected: boolean }>`
  background: transparent;
  border: none;
  gap: 0.5rem;
  display: flex;
  background-color: ${palette.white};
  height: 58px;
  padding: 0 1rem;
  cursor: pointer;
  border-left: 2px solid ${palette.purple};
  border-right: 2px solid ${palette.purple};

  ${({ isSelected }) =>
    isSelected &&
    css`
      pointer-events: none;
      background: ${palette.blue2};
    `}

  &:hover {
    background-color: ${palette.lightblue};
  }
`;
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
      color={isSelected ? 'blueDark' : 'purple'}
      variant={isSelected ? 'linkDisabled' : 'linkBold'}
    >
      {text}
    </Text>
  </Button>
);

const Button = styled.button<{ isSelected: boolean }>`
  background: transparent;
  background-color: ${palette.white};
  border: none;
  border-left: 2px solid ${palette.purple};
  border-right: 2px solid ${palette.purple};
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  height: 58px;
  padding: 0 1rem;

  ${({ isSelected }) =>
    isSelected &&
    css`
      background: ${palette.blue};
      pointer-events: none;
    `}

  &:hover {
    background-color: ${palette.blueLight};
  }
`;

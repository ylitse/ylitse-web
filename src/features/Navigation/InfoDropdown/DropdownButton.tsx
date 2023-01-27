import styled, { css } from 'styled-components';

import { useHover } from '@/hooks/useHover';

import { Chevron } from '@/components/Icons/Chevron';
import { palette } from '@/components/variables';
import Text from '@/components/Text';

type Props = {
  isComponentVisible: boolean;
  setIsComponentVisible: (next: boolean) => void;
  text: string;
};

export const DropdownButton: React.FC<Props> = ({
  isComponentVisible,
  setIsComponentVisible,
  text,
}) => {
  const { ref, isHovering } = useHover();
  const color = isHovering || isComponentVisible ? 'blueDark' : 'white';

  return (
    <Button
      isExpanded={isComponentVisible}
      onClick={() => setIsComponentVisible(!isComponentVisible)}
      ref={ref}
    >
      <ButtonText variant="link" color={color}>
        {text}
      </ButtonText>
      {isComponentVisible ? (
        <Chevron variant="up" color={color} />
      ) : (
        <Chevron variant="down" color={color} />
      )}
    </Button>
  );
};

const Button = styled.button<{ isExpanded?: boolean }>`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 4px;
  height: 60px;
  justify-content: center;
  padding: 0 1rem;
  position: relative;
  text-align: center;

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      background-color: ${palette.white};
    `}

  &:hover {
    background-color: ${palette.blue};
    border-bottom: 2px solid ${palette.blue};
  }
`;

const ButtonText = styled(Text)`
  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

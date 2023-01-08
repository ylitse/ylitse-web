import React from 'react';

import { useHover } from '@/hooks/useHover';

import { palette } from '@/components/variables';
import styled, { css } from 'styled-components';
import Text from '@/components/Text';
import { ChevronUp } from '@/components/Icons/ChevronUp';
import { ChevronDown } from '@/components/Icons/ChevronDown';

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
  const color = isHovering || isComponentVisible ? 'darkblue' : 'white';

  return (
    <Button
      isExpanded={isComponentVisible}
      onClick={() => setIsComponentVisible(!isComponentVisible)}
      ref={ref}
    >
      <Text variant={isHovering ? 'linkDisabled' : 'link'} color={color}>
        {text}
      </Text>
      {isComponentVisible ? (
        <ChevronUp size={8} color={color} />
      ) : (
        <ChevronDown size={8} color={color} />
      )}
    </Button>
  );
};

export const Button = styled.button<{ isExpanded?: boolean }>`
  position: relative;
  cursor: pointer;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  text-align: center;
  padding: 0 1rem;

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      background-color: ${palette.white};
    `}

  &:hover {
    background-color: ${palette.blue2};
  }
`;

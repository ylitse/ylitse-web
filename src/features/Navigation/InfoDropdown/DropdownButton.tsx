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
  const color = isHovering || isComponentVisible ? 'blueDark' : 'white';

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
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 4px;
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

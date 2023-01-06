import React from 'react';
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
  return (
    <Button
      isExpanded={isComponentVisible}
      onClick={() => setIsComponentVisible(!isComponentVisible)}
    >
      <Text variant={'link'} color={isComponentVisible ? 'darkblue' : 'white'}>
        {text}
      </Text>
      {isComponentVisible ? (
        <ChevronUp size={8} color="purple" />
      ) : (
        <ChevronDown size={8} color="white" />
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

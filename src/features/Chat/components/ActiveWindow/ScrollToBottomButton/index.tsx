import React from 'react';
import styled, { css } from 'styled-components';
import { ButtonProps, IconButton } from '@/components/Buttons';

type Props = ButtonProps<'button'> & {
  isVisible: boolean;
};

const ScrollToBottomButton = React.forwardRef<HTMLDivElement, Props>(
  ({ isVisible, ...props }, ref) => {
    return (
      <ButtonContainer ref={ref} isVisible={isVisible}>
        <IconButton {...props} />
      </ButtonContainer>
    );
  },
);

const ButtonContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  z-index: 10;
  ${({ isVisible }) =>
    isVisible &&
    css`
      display: none;
    `}
`;

// forward-ref thing
ScrollToBottomButton.displayName = 'ScrollToBottomButton';

export default ScrollToBottomButton;

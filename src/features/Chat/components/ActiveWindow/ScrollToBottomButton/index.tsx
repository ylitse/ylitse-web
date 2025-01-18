import React from 'react';
import styled from 'styled-components';
import { ButtonProps, IconButton } from '@/components/Buttons';

const ScrollToBottomButton = React.forwardRef<
  HTMLDivElement,
  ButtonProps<'button'>
>((props, ref) => {
  return (
    <ButtonContainer ref={ref}>
      <IconButton {...props} />
    </ButtonContainer>
  );
});

const ButtonContainer = styled.div`
  position: fixed;
  z-index: 10;
`;

export default ScrollToBottomButton;

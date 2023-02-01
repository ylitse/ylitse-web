import { ComponentPropsWithoutRef, ElementType } from 'react';
import styled, { css } from 'styled-components';

import { ButtonIcon, iconVariants } from './variants';

type ButtonProps<T extends ElementType> = {
  variant: ButtonIcon;
  sizeInPx: number;
} & ComponentPropsWithoutRef<T>;

const IconButton = <T extends ElementType = 'button'>({
  variant,
  sizeInPx,
  onClick,
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return (
    <Container onClick={onClick}>
      <StyledIconButton
        variant={variant}
        size={sizeInPx}
        {...rest}
        aria-label={variant}
      />
    </Container>
  );
};

const StyledIconButton = styled.button<{
  variant: ButtonIcon;
  size: number;
}>`
  appearance: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  cursor: pointer;
  z-index: 10;
  ${({ size }) => css`
    height: ${size}px;
    width: ${size}px;
  `}
  ${({ variant }) => variant && iconVariants[variant]}
`;

const Container = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;

  &:hover {
    opacity: 0.7;
  }
`;

export default IconButton;

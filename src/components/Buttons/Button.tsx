import { ComponentPropsWithoutRef, ElementType } from 'react';
import styled, { css } from 'styled-components';

import { TextVariant } from '../Text/variants';
import Text from '../Text';
import { Color } from '../variables';
import { ButtonIcon, iconVariants } from './variants';

type ButtonProps<T extends ElementType> = {
  leftIcon?: ButtonIcon;
  rightIcon?: ButtonIcon;
  sizeInPx: number;
  text?: { variant: TextVariant; color: Color; text: string };
} & ComponentPropsWithoutRef<T>;

const IconButton = <T extends ElementType = 'button'>({
  variant,
  sizeInPx,
  text,
  leftIcon,
  rightIcon,
  onClick,
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return (
    <Button onClick={onClick} {...rest} aria-label={variant}>
      {leftIcon && <Icon variant={leftIcon} size={sizeInPx} />}

      {text && (
        <Text variant={text.variant} color={text.color}>
          {text.text}
        </Text>
      )}

      {rightIcon && <Icon variant={rightIcon} size={sizeInPx} />}
    </Button>
  );
};

const Icon = styled.span<{
  variant: ButtonIcon;
  size: number;
}>`
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  z-index: 10;
  ${({ size }) => css`
    height: ${size}px;
    width: ${size}px;
  `}
  ${({ variant }) => variant && iconVariants[variant]}
`;

const Button = styled.button`
  align-items: center;
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;

  &:hover {
    opacity: 0.7;
  }
`;

export default IconButton;

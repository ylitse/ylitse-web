import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import * as cssVariables from '../variables';
import styled from 'styled-components';

export type ButtonColorVariant = 'light' | 'dark' | 'disabled';

type ButtonProps<T extends ElementType> = {
  children: ReactNode;
  variant?: ButtonColorVariant;
} & ComponentPropsWithoutRef<T>;

const TextButton = <T extends ElementType = 'button'>({
  children,
  variant = 'dark',
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return (
    <StyledTextButton variant={variant} {...rest}>
      {children}
    </StyledTextButton>
  );
};

const variantOptions = {
  dark: {
    backgroundColor: cssVariables.palette.purple,
    color: cssVariables.palette.orange,
    ['&: hover']: {
      backgroundColor: cssVariables.palette.darkpurple,
    },
    ['&: focus']: {
      outline: `1px solid ${cssVariables.palette.purple}`,
      outlineOffset: '3px',
    },
    ['&: active, &: visited']: {
      backgroundColor: cssVariables.palette.midpurple,
      color: cssVariables.palette.orange2,
      outline: 'none',
    },
  },
  light: {
    border: `2px solid ${cssVariables.palette.purple}`,
    backgroundColor: cssVariables.palette.white,
    color: cssVariables.palette.purple,
    ['&: hover']: {
      border: `2px solid ${cssVariables.palette.darkpurple}`,
      color: cssVariables.palette.darkpurple,
      outline: `none`,
    },
    ['&: focus']: {
      outline: 'none',
    },
    ['&: active, &: visited']: {
      outline: 'none',
    },
  },
  disabled: {
    backgroundColor: cssVariables.palette.midgray,
    color: cssVariables.palette.fadedgray,
    ['&: hover']: {
      outline: `none`,
    },
    ['&: focus']: {
      outline: 'none',
    },
    ['&: active, &: visited']: {
      outline: 'none',
    },
  },
};

const StyledTextButton = styled.button<{ variant: ButtonColorVariant }>`
  ${cssVariables.basicBalooText}
  border: none;
  line-height: 150%;
  padding: ${cssVariables.spacing.small_button_padding};
  margin-bottom: 4px;
  border-radius: 1.25rem;
  position: relative;
  left: 50%;
  bottom: ${cssVariables.spacing.layout_spacing};
  transform: translateX(-50%);
  width: fit-content;
  cursor: pointer;
  ${({ variant }) => variant && variantOptions[variant]}
`;

export default TextButton;

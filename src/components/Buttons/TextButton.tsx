import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import styled from 'styled-components';
import { spacing } from '../variables';
import { variants } from './variants';

export type ButtonColorVariant =
  | 'danger'
  | 'dark'
  | 'disabled'
  | 'light'
  | 'outline';

type Size = 'normal' | 'large';

type ButtonProps<T extends ElementType> = {
  children: ReactNode;
  className?: string;
  size?: Size;
  variant?: ButtonColorVariant;
} & ComponentPropsWithoutRef<T>;

const TextButton = <T extends ElementType = 'button'>({
  children,
  size = 'normal',
  variant = 'dark',
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return (
    <StyledTextButton size={size} variant={variant} {...rest}>
      {children}
    </StyledTextButton>
  );
};

const StyledTextButton = styled.button<{
  size: Size;
  variant: ButtonColorVariant;
}>`
  border: none;
  border-radius: 50px;
  bottom: ${spacing.layout_spacing};
  cursor: pointer;
  font-family: 'Baloo 2';
  font-size: ${({ size }) => (size === 'large' ? '1.2rem' : '1rem')};
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;
  padding: 0.5rem 2rem;
  width: fit-content;
  &:hover {
    opacity: 0.7;
  }
  ${({ variant }) => variants[variant]}
`;

export default TextButton;

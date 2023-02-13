import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import styled from 'styled-components';
import { spacing } from '../variables';
import { variants } from './variants';

export type ButtonColorVariant = 'light' | 'dark' | 'disabled';

type ButtonProps<T extends ElementType> = {
  children: ReactNode;
  variant?: ButtonColorVariant;
  className?: string;
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

const StyledTextButton = styled.button<{ variant: ButtonColorVariant }>`
  border: none;
  border-radius: 1.25rem;
  bottom: ${spacing.layout_spacing};
  cursor: pointer;
  font-family: 'Baloo 2';
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;
  margin-bottom: 4px;
  padding: 0.5rem 2rem;
  width: fit-content;
  &:hover {
    opacity: 0.7;
  }
  ${({ variant }) => variants[variant]}
`;

export default TextButton;

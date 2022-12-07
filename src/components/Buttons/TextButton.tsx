import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import * as cssVariables from '../variables';
import styled from 'styled-components';
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
  ${cssVariables.basicBalooText}
  border: none;
  line-height: 150%;
  padding: ${cssVariables.spacing.small_button_padding};
  margin-bottom: 4px;
  border-radius: 1.25rem;
  bottom: ${cssVariables.spacing.layout_spacing};
  width: fit-content;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  ${({ variant }) => variants[variant]}
`;

export default TextButton;

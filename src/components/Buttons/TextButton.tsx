import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import * as cssVariables from '../variables';
import styled from 'styled-components';
import { variant } from 'styled-system';

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

const StyledTextButton = styled('button')(
  {
    fontFamily: "'Baloo 2', cursive",
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '1rem',
    border: 'none',
    lineHeight: '150%',
    padding: cssVariables.spacing.small_button_padding,
    borderRadius: '1.25rem',
    position: 'relative',
    left: '50%',
    bottom: cssVariables.spacing.layout_spacing,
    transform: 'translateX(-50%)',
  },
  variant({
    variants: {
      dark: {
        backgroundColor: cssVariables.palette.purple,
        color: cssVariables.palette.orange,
        ['&: hover']: {
          opacity: 0.7,
        },
      },
      light: {
        border: `2px solid ${cssVariables.palette.purple}`,
        backgroundColor: 'white',
        color: cssVariables.palette.purple,
      },
      disabled: {
        backgroundColor: cssVariables.palette.midgray,
        color: cssVariables.palette.fadedgray,
      },
    },
  }),
);

export default TextButton;

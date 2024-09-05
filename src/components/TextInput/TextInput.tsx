import CSS from 'csstype';
import { ComponentPropsWithoutRef, ElementType } from 'react';
import styled, { css } from 'styled-components';

import { ButtonIcon, iconVariants } from '@/components/Buttons/variants';
import { Color, palette } from '@/components/constants';
import { IconButton } from '@/components/Buttons';
import { TextInputElement, variants } from './variants';

import type { TextInputVariant } from './variants';

type TextInputProps<T extends ElementType> = {
  variant?: TextInputVariant;
  color?: Color;
  className?: string;
  isDisabled?: boolean;
  isError?: boolean;
  isPassword?: boolean;
  id?: string;
  leftIcon?: {
    variant: ButtonIcon;
    sizeInPx: number;
  };
  rightButton?: {
    variant: ButtonIcon;
    sizeInPx: number;
  } & ComponentPropsWithoutRef<T>;
  rows?: number;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

export const TextInput = <T extends ElementType = TextInputElement>({
  variant = 'input',
  color = 'blueDark',
  isDisabled = false,
  isError = false,
  isPassword = false,
  id,
  leftIcon,
  rightButton,
  rows = 2,
  onChange,
  placeholder = '',
  value,
}: TextInputProps<T>): JSX.Element => {
  const TextInputElement = variants[variant].element;
  const variantStyles = variants[variant].styles;

  const variantBorder: CSS.Properties = {
    border: isError
      ? `2px solid ${palette.redDark}`
      : `1px solid ${palette.purple}`,
  };
  const variantColor: CSS.Properties = { color: palette[color] };

  const type = isPassword ? 'password' : 'text';
  const isTextArea = variant === 'textarea';

  return (
    <>
      {leftIcon && (
        <LeftIcon variant={leftIcon.variant} sizeInPx={leftIcon.sizeInPx} />
      )}
      <TextInputElement
        disabled={isDisabled}
        id={id}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ ...variantStyles, ...variantBorder, ...variantColor }}
        type={type}
        value={value}
        {...(isTextArea && { rows })}
      />
      {rightButton && (
        <StyledIconButton
          onClick={rightButton.onClick}
          variant={rightButton.variant}
          sizeInPx={rightButton.sizeInPx}
        />
      )}
    </>
  );
};

const LeftIcon = styled.div<{
  variant: ButtonIcon;
  sizeInPx: number;
}>`
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  ${({ variant }) => variant && `background-image: ${iconVariants[variant]};`}
  ${({ sizeInPx }) => css`
    height: ${sizeInPx}px;
    transform: translate(${sizeInPx + 22}px);
    width: ${sizeInPx}px;
  `}
`;

const StyledIconButton = styled(IconButton)<{
  sizeInPx: number;
}>`
  ${({ sizeInPx }) => css`
    transform: translate(-${sizeInPx + 18}px);
  `}
`;

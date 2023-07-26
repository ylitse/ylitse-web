import CSS from 'csstype';
import { variants } from './variants';
import { palette } from '../variables';
import type { TextVariant } from './variants';
import type { Color } from '../variables';

type Props = {
  variant?: TextVariant;
  color?: Color;
  className?: string;
  children: React.ReactNode;
  inputId?: string;
};

export const Text: React.FC<Props> = ({
  variant = 'p',
  color = 'blueDark',
  className,
  children,
  inputId,
}) => {
  const TextElement = variants[variant].element;
  const variantStyles = variants[variant].styles;
  const variantColor: CSS.Properties = { color: palette[color] };

  return (
    <TextElement
      htmlFor={inputId}
      className={className}
      style={{ ...commonStyles, ...variantStyles, ...variantColor }}
    >
      {children}
    </TextElement>
  );
};

const commonStyles = {
  color: palette.white,
};

import CSS from 'csstype';
import { variants } from './variants';
import { palette } from '../variables';
import type { TextInputVariant } from './variants';
import type { Color } from '../variables';

type Props = {
  variant?: TextInputVariant;
  color?: Color;
  className?: string;
  placeholder?: string;
};

export const TextInput: React.FC<Props> = ({
  variant = 'input',
  color = 'blueDark',
  className,
  placeholder = '',
}) => {
  const TextInputElement = variants[variant].element;
  const variantStyles = variants[variant].styles;
  const variantColor: CSS.Properties = { color: palette[color] };

  return (
    <TextInputElement
      className={className}
      placeholder={placeholder}
      style={{ ...variantStyles, ...variantColor }}
    />
  );
};

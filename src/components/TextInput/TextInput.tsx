import CSS from 'csstype';
import { variants } from './variants';
import { palette } from '../variables';
import type { TextInputVariant } from './variants';
import type { Color } from '../variables';

type Props = {
  variant?: TextInputVariant;
  color?: Color;
  className?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

export const TextInput: React.FC<Props> = ({
  variant = 'input',
  color = 'blueDark',
  className,
  onChange,
  placeholder = '',
  value,
}) => {
  const TextInputElement = variants[variant].element;
  const variantStyles = variants[variant].styles;
  const variantColor: CSS.Properties = { color: palette[color] };

  return (
    <TextInputElement
      className={className}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...variantStyles, ...variantColor }}
      type="text"
      value={value}
    />
  );
};

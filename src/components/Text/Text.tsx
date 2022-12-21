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
};

export const Text: React.FC<Props> = ({
  variant = 'p',
  color = 'darkblue',
  className,
  children,
}) => {
  const TextElement = variants[variant].element;
  const variantStyles = variants[variant].styles;
  const variantColor: CSS.Properties = { color: palette[color] };

  return (
    <TextElement
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

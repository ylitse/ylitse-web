import CSS from 'csstype';
import { variants } from './variants';
import { Color } from '../variables';
import * as cssVariables from '../variables';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'p' | 'a';

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
  const variantColor: CSS.Properties = { color: cssVariables.palette[color] };

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
  color: cssVariables.palette.white,
};

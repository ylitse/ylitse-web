import CSS from 'csstype';
import { variants } from './variants';

export type TextVariant =
  | 'heading1_white'
  | 'heading2_white'
  | 'heading3_white'
  | 'paragraph_white'
  | 'link_white'
  | 'heading1_dark'
  | 'heading2_dark'
  | 'heading3_dark'
  | 'paragraph_dark'
  | 'link_dark';

type Props = {
  variant?: TextVariant;
  style?: CSS.Properties;
  children: React.ReactNode;
};

export const Text: React.FC<Props> = ({
  variant = 'paragraph_dark',
  style,
  children,
}) => {
  const TextElement = variants[variant].element;
  const variantStyles = variants[variant].styles;

  return (
    <TextElement style={{ ...commonStyles, ...variantStyles, ...style }}>
      {children}
    </TextElement>
  );
};

const commonStyles = {
  color: '#FFF',
};

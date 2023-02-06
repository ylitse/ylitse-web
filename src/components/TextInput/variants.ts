import CSS from 'csstype';
import { palette } from '../variables';

export type TextInputVariant = 'input' | 'textarea';
export type TextInputElement = 'input' | 'textarea';

type TextInputProp = {
  element: TextInputElement;
  styles: CSS.Properties;
};

export const variants: Record<TextInputVariant, TextInputProp> = {
  input: {
    element: 'input',
    styles: {},
  },
  textarea: {
    element: 'textarea',
    styles: {
      border: `1px solid ${palette.purple}`,
      borderRadius: '10px',
      fontFamily: '"Source Sans Pro"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '1.5rem',
      padding: '0.75rem 1.25rem',
      resize: 'none',
    },
  },
};

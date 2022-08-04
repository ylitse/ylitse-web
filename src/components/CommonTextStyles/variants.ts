import CSS from 'csstype';
import { TextVariant } from './Text';

export type TextElement = 'h1' | 'h2' | 'h3' | 'p' | 'a';

type TextProp = {
  element: TextElement;
  styles: CSS.Properties;
};

export const variants: Record<TextVariant, TextProp> = {
  h1: {
    element: 'h1',
    styles: {
      fontFamily: '"Baloo 2"',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '1.5rem',
      lineHeight: '2.2rem',
    },
  },
  h2: {
    element: 'h2',
    styles: {
      fontFamily: '"Baloo 2"',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '1.25rem',
      lineHeight: '2rem',
    },
  },
  h3: {
    element: 'h3',
    styles: {
      fontFamily: '"Baloo 2"',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '1.1rem',
      lineHeight: '1.6rem',
    },
  },
  p: {
    element: 'p',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  a: {
    element: 'a',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
};

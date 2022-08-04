import * as cssVariables from './variables';
import CSS from 'csstype';
import { TextVariant } from './Text';

export type TextElement = 'h1' | 'h2' | 'h3' | 'p' | 'a';

type TextProp = {
  element: TextElement;
  styles: CSS.Properties;
};

export const variants: Record<TextVariant, TextProp> = {
  heading1_white: {
    element: 'h1',
    styles: {
      fontFamily: '"Baloo 2"',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '1.5rem',
      lineHeight: '2.2rem',
      color: '#ffffff',
    },
  },
  heading2_white: {
    element: 'h2',
    styles: {
      fontFamily: '"Baloo 2"',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '1.25rem',
      lineHeight: '2rem',
      color: '#ffffff',
    },
  },
  heading3_white: {
    element: 'h3',
    styles: {
      fontFamily: '"Baloo 2"',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '1.1rem',
      lineHeight: '1.6rem',
      color: '#ffffff',
    },
  },
  paragraph_white: {
    element: 'p',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      color: '#ffffff',
    },
  },
  link_white: {
    element: 'a',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      color: '#ffffff',
    },
  },

  heading1_dark: {
    element: 'h1',
    styles: {
      fontFamily: '"Baloo 2"',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '1.5rem',
      lineHeight: '2.2rem',
      color: cssVariables.palette.darkblue,
    },
  },

  heading2_dark: {
    element: 'h2',
    styles: {
      fontFamily: '"Baloo 2"',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '1.25rem',
      lineHeight: '2rem',
      color: cssVariables.palette.darkblue,
    },
  },

  heading3_dark: {
    element: 'h3',
    styles: {
      fontFamily: '"Baloo 2"',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '1.1rem',
      lineHeight: '1.6rem',
      color: cssVariables.palette.darkblue,
    },
  },

  paragraph_dark: {
    element: 'p',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      color: cssVariables.palette.darkblue,
    },
  },

  link_dark: {
    element: 'a',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      color: cssVariables.palette.purple,
    },
  },
};

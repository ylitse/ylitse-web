import CSS from 'csstype';
import { FOOTER_HEIGHT } from '../variables';

export type TextVariant =
  | 'boldBaloo'
  | 'boldSource'
  | 'chip'
  | 'footer'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'link'
  | 'linkHeader'
  | 'logo'
  | 'p';
export type TextElement = 'a' | 'h1' | 'h2' | 'h3' | 'p' | 'span';

type TextProp = {
  element: TextElement;
  styles: CSS.Properties;
};

export const variants: Record<TextVariant, TextProp> = {
  boldBaloo: {
    element: 'span',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: '1.5rem',
    },
  },
  boldSource: {
    element: 'span',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: '1.5rem',
    },
  },
  chip: {
    element: 'span',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '1rem',
    },
  },
  footer: {
    element: 'span',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: FOOTER_HEIGHT,
    },
  },
  h1: {
    element: 'h1',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1.5rem',
      fontStyle: 'normal',
      fontWeight: '700',
    },
  },
  h2: {
    element: 'h2',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1.5rem',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: '2.2rem',
    },
  },
  h3: {
    element: 'h3',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1.1rem',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: '1.6rem',
    },
  },
  link: {
    element: 'span',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: '60px',
    },
  },
  linkHeader: {
    element: 'span',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1.1rem',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: '60px',
    },
  },
  logo: {
    element: 'p',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '2rem',
      fontStyle: 'normal',
      fontWeight: '600',
      letterSpacing: '0.1em',
      lineHeight: 'initial',
      textTransform: 'uppercase',
    },
  },
  p: {
    element: 'p',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '1.5rem',
    },
  },
};

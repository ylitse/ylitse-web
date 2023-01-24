import CSS from 'csstype';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'p'
  | 'a'
  | 'logo'
  | 'link'
  | 'linkBold'
  | 'linkMobile'
  | 'chatMenuLink'
  | 'linkDisabled'
  | 'linkDisabledMobile';
export type TextElement = 'h1' | 'h2' | 'h3' | 'p' | 'a' | 'span';

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
  logo: {
    element: 'p',
    styles: {
      fontFamily: '"Baloo 2", cursive',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '2.0rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      lineHeight: 'initial',
    },
  },
  link: {
    element: 'span',
    styles: {
      fontFamily: '"Baloo 2", cursive',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '60px',
    },
  },
  linkBold: {
    element: 'span',
    styles: {
      fontFamily: '"Baloo 2", cursive',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: '58px',
    },
  },
  linkMobile: {
    element: 'span',
    styles: {
      fontFamily: '"Baloo 2", cursive',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: '40px',
      fontSize: 'larger',
    },
  },
  chatMenuLink: {
    element: 'a',
    styles: {
      fontFamily: '"Baloo 2"',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  linkDisabled: {
    element: 'span',
    styles: {
      fontFamily: '"Baloo 2", cursive',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '58px',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
    },
  },
  linkDisabledMobile: {
    element: 'span',
    styles: {
      fontFamily: '"Baloo 2", cursive',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '40px',
      fontSize: 'larger',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
    },
  },
};

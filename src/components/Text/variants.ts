import CSS from 'csstype';

export type TextVariant =
  | 'bold'
  | 'footer'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'label'
  | 'link'
  | 'linkBold'
  | 'linkDisabled'
  | 'linkDisabledMobile'
  | 'linkMobile'
  | 'logo'
  | 'p';
export type TextElement = 'a' | 'h1' | 'h2' | 'h3' | 'p' | 'span';

type TextProp = {
  element: TextElement;
  styles: CSS.Properties;
};

export const variants: Record<TextVariant, TextProp> = {
  bold: {
    element: 'span',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: '1.5rem',
    },
  },
  footer: {
    element: 'span',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '3.5rem',
    },
  },
  h1: {
    element: 'h1',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1.5rem',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: '2.2rem',
    },
  },
  h2: {
    element: 'h2',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1.25rem',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: '2rem',
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
  label: {
    element: 'span',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '1.5rem',
    },
  },
  link: {
    element: 'span',
    styles: {
      fontFamily: '"Baloo 2", cursive',
      fontSize: '1rem',
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
      fontSize: 'larger',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '40px',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
    },
  },
  linkMobile: {
    element: 'span',
    styles: {
      fontFamily: '"Baloo 2", cursive',
      fontSize: 'larger',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: '40px',
    },
  },
  logo: {
    element: 'p',
    styles: {
      fontFamily: '"Baloo 2", cursive',
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

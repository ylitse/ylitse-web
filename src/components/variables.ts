//colors
export type Color = keyof typeof palette;

export const palette = {
  purple: '#4A2ACB',
  midpurple: '#5C33FF',
  darkpurple: '#37119D',
  palepurple: '#E5E4FF',
  hoverpurple: '#CDCBFF',
  bluegrey: '#4C6282',
  blue2: '#43BFFF',
  darkblue: '#1C325D',
  lightblue: '#D3EFFF',
  whiteblue: '#E4F3FB',
  footerblue: '#01A5EC',
  orange: '#F0BA8C',
  orange2: '#FFD79B',
  white: '#FFFFFF',
  lightgrey: '#E9E9E9',
  midgray: '#DBDBDB',
  spinnerBackgrond: '#DDEBE9',
  fadedgray: '#616161',
  blurbackground: 'rgba(57, 57, 57, 0.75)',
};

//breakpoints
export const MOBILE_TRESHOLD = 600;
export const breakpoints = {
  mobile: `${MOBILE_TRESHOLD}px`,
};

export const spacing = {
  layout_spacing: '2rem',
  button_padding: '0.75rem 1.25rem',
  small_button_padding: '.5rem 2rem',
  layout_outer_spacing: '6vw',
  content_width: '76vw',
};

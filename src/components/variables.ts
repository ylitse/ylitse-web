export type Color = keyof typeof palette;

export const palette = {
  blue2: '#43BFFF',
  bluegrey: '#4C6282',
  blurbackground: 'rgba(57, 57, 57, 0.75)',
  darkblue: '#1C325D',
  darkpurple: '#37119D',
  fadedgray: '#616161',
  footerblue: '#01A5EC',
  hoverpurple: '#CDCBFF',
  lightblue: '#D3EFFF',
  lightgrey: '#E9E9E9',
  midgray: '#DBDBDB',
  midpurple: '#5C33FF',
  orange: '#F0BA8C',
  orange2: '#FFD79B',
  palepurple: '#E5E4FF',
  purple: '#4A2ACB',
  spinnerBackgrond: '#DDEBE9',
  white: '#FFFFFF',
  whiteblue: '#E4F3FB',
};

//breakpoints
export const MOBILE_TRESHOLD = 600;
export const breakpoints = {
  mobile: `${MOBILE_TRESHOLD}px`,
};

export const spacing = {
  button_padding: '0.75rem 1.25rem',
  content_width: '76vw',
  layout_outer_spacing: '6vw',
  layout_spacing: '2rem',
  small_button_padding: '.5rem 2rem',
};

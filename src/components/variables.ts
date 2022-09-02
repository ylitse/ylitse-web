//colors
export type Color = keyof typeof palette;

export const palette = {
  purple: '#4A2ACB',
  midpurple: '#5C33FF',
  darkpurple: '#37119D',
  palepurple: '#E5E4FF',
  hoverpurple: '#cdcbff',
  bluegrey: '#4C6282',
  blue2: '#43BFFF',
  darkblue: '#1C325D',
  lightblue: '#CDE8F8',
  whiteblue: '#E4F3FB',
  footerblue: '#01A5EC',
  orange: '#F0BA8C',
  orange2: '#FFD79B',
  warningred: '#972232',
  white: '#fff',
  midgray: '#DBDBDB',
  fadedgray: '#616161',
  blurbackground: 'rgba(57, 57, 57, 0.75)',
};

//breakpoints
export const breakpoints = {
  mobile: '600px',
};

//spacing
export const spacing = {
  layout_spacing: '2rem',
  button_padding: '0.75rem 1.25rem',
  small_button_padding: '.5rem 2rem',
  layout_outer_spacing: '6vw',
  content_width: '76vw',
};

export const basicBalooText = {
  fontFamily: "'Baloo 2', cursive",
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '1rem',
};

export const basicSourceSansText = {
  fontFamily: "'Source Sans Pro', cursive",
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '1.25rem',
};
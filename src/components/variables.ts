export type Color = keyof typeof palette;

export const palette = {
  blue: '#01A5EC',
  blue2: '#43BFFF',
  blueDark: '#1C325D',
  blueGrey: '#4C6282',
  blueLight: '#D3EFFF',
  blueWhite: '#E4F3FB ',
  greyFaded: '#616161',
  greyLight: '#E9E9E9',
  greyMid: '#DBDBDB',
  greyOverlay: 'rgba(57, 57, 57, 0.75)',
  orange: '#F0BA8C',
  orange2: '#FFD79B',
  purple: '#4A2ACB',
  purpleDark: '#37119D',
  purpleHover: '#CDCBFF',
  purpleMid: '#5C33FF',
  purplePale: '#E5E4FF',
  redDark: '#972232',
  white: '#FFFFFF',
  whiteOpacity: 'rgba(255, 255, 255, 0.5)',
};

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

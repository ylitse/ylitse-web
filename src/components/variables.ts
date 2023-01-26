export type Color = keyof typeof palette;

export const palette = {
  backgroundBlur: 'rgba(57, 57, 57, 0.75)',
  backgroundSpinner: '#DDEBE9',
  blue: '#43BFFF',
  blueDark: '#1C325D',
  blueFooter: '#01A5EC',
  blueLight: '#D3EFFF',
  greyBluish: '#4C6282',
  greyFaded: '#616161',
  greyLight: '#E9E9E9',
  greyMid: '#DBDBDB',
  orange: '#F0BA8C',
  orange2: '#FFD79B',
  purple: '#4A2ACB',
  purpleDark: '#37119D',
  purpleHover: '#CDCBFF',
  purpleMid: '#5C33FF',
  purplePale: '#E5E4FF',
  white: '#FFFFFF',
  whiteBluish: '#E4F3FB ',
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

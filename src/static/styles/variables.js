import styled from 'styled-components';

//colors
export const palette = {
  purple: '#4A2ACB',
  darkpurple: '#37119D',
  palepurple: '#E5E4FF',
  bluegrey: '#4C6282',
  blue2: '#43BFFF',
  darkblue: '#1C325D',
  lightblue: '#CDE8F8',
  whiteblue: '#E4F3FB',
  footerblue: '#01A5EC',
  orange: '#F0BA8C',
  warningred: '#972232',
  white: '#fff',
};

//breakpoints
export const breakpoints = {
  mobile: '600px',
};

//spacing
export const spacing = {
  layout_spacing: '5rem',
  button_padding: '0.75rem 1.25rem',
  small_button_padding: '.5rem 2rem',
};

//typography
export const heading1_white = styled.h1`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.2rem;
  color: #ffffff;
`;

export const heading2_white = styled.h2`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 2rem;
  color: #ffffff;
`;

export const heading3_white = styled.h3`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.6rem;
  color: #ffffff;
`;

export const paragraph_white = styled.p`
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
  color: #ffffff;
`;

export const link_white = styled.a`
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 150%;
  color: #ffffff;
`;

export const heading1_dark = styled.h1`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.2rem;
  color: ${palette.darkblue};
`;

export const heading2_dark = styled.h2`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 2rem;
  color: ${palette.darkblue};
`;

export const heading3_dark = styled.h3`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.6rem;
  color: ${palette.darkblue};
`;

export const paragraph_dark = styled.p`
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
  color: ${palette.darkblue};
`;

export const link_dark = styled.a`
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 150%;
  color: ${palette.purple};
`;

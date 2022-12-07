import * as cssVariables from '../variables';

export const variants = {
  dark: {
    backgroundColor: cssVariables.palette.purple,
    color: cssVariables.palette.orange,
    ['&: hover']: {
      backgroundColor: cssVariables.palette.darkpurple,
    },
    ['&: focus']: {
      outline: `1px solid ${cssVariables.palette.purple}`,
      outlineOffset: '3px',
    },
    ['&: active, &: visited']: {
      backgroundColor: cssVariables.palette.midpurple,
      color: cssVariables.palette.orange2,
      outline: 'none',
    },
  },
  light: {
    border: `2px solid ${cssVariables.palette.purple}`,
    backgroundColor: cssVariables.palette.white,
    color: cssVariables.palette.purple,
    ['&: hover']: {
      border: `2px solid ${cssVariables.palette.darkpurple}`,
      color: cssVariables.palette.darkpurple,
      outline: `none`,
    },
    ['&: focus']: {
      outline: 'none',
    },
    ['&: active, &: visited']: {
      outline: 'none',
    },
  },
  disabled: {
    backgroundColor: cssVariables.palette.midgray,
    color: cssVariables.palette.fadedgray,
    ['&: hover']: {
      outline: `none`,
    },
    ['&: focus']: {
      outline: 'none',
    },
    ['&: active, &: visited']: {
      outline: 'none',
    },
  },
};

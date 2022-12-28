import { palette } from '../variables';

export const variants = {
  dark: {
    backgroundColor: palette.purple,
    color: palette.orange,
    ['&: hover']: {
      backgroundColor: palette.darkpurple,
    },
    ['&: focus']: {
      outline: `1px solid ${palette.purple}`,
      outlineOffset: '3px',
    },
    ['&: active, &: visited']: {
      backgroundColor: palette.midpurple,
      color: palette.orange2,
      outline: 'none',
    },
  },
  light: {
    border: `2px solid ${palette.purple}`,
    backgroundColor: palette.white,
    color: palette.purple,
    ['&: hover']: {
      border: `2px solid ${palette.darkpurple}`,
      color: palette.darkpurple,
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
    backgroundColor: palette.midgray,
    color: palette.fadedgray,
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

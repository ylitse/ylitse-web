import { palette } from '../variables';

export const variants = {
  dark: {
    backgroundColor: palette.purple,
    color: palette.orange,

    ['&: active, &: visited']: {
      backgroundColor: palette.midpurple,
      color: palette.orange2,
      outline: 'none',
    },
    ['&: focus']: {
      outline: `1px solid ${palette.purple}`,
      outlineOffset: '3px',
    },
    ['&: hover']: {
      backgroundColor: palette.purpleDark,
    },
  },
  disabled: {
    backgroundColor: palette.midgray,
    color: palette.fadedgray,

    ['&: active, &: visited']: {
      outline: 'none',
    },
    ['&: focus']: {
      outline: 'none',
    },
    ['&: hover']: {
      outline: `none`,
    },
  },
  light: {
    backgroundColor: palette.white,
    border: `2px solid ${palette.purple}`,
    color: palette.purple,

    ['&: active, &: visited']: {
      outline: 'none',
    },
    ['&: focus']: {
      outline: 'none',
    },
    ['&: hover']: {
      border: `2px solid ${palette.darkpurple}`,
      color: palette.darkpurple,
      outline: `none`,
    },
  },
};

import { palette } from '@/components/variables';

export const folderColors = {
  ok: {
    active: palette.blue2,
    hover: palette.blueWhite,
  },
  archived: {
    active: palette.orange,
    hover: palette.orangeWhite,
  },
  banned: {
    active: palette.redSalmon,
    hover: palette.redWhite,
  },
};

export const messageColors = {
  ok: {
    received: palette.blueWhite,
    sent: palette.blueLight,
  },
  archived: {
    received: palette.orangeWhite,
    sent: palette.orangeLight,
  },
  banned: {
    received: palette.redWhite,
    sent: palette.redSalmon,
  },
};

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

// Widths
export const CHAT_GAP_WIDTH = '22px';
export const CHAT_MENU_WIDTH = '400px';
export const CHAT_WINDOW_MIN_WIDTH = '1000px';

// Heights
export const CHAT_MIN_HEIGHT = '600px';
export const CHAT_MIN_HEIGHT_TABLET = '400px';

// Row heights
export const ROW_HEIGHT = '80px';
export const HIGH_ROW_HEIGHT = '100px';
export const SHORT_ROW_HEIGHT = '60px';

export const statusUpdateSuccessMessages = {
  ok: 'chat:notification.restoringSuccess',
  banned: 'chat:notification.banningSuccess',
  archived: 'chat:notification.archivingSuccess',
} as const;

export const statusUpdateErrorMessages = {
  ok: 'chat:notification.restoringError',
  banned: 'chat:notification.banningError',
  archived: 'chat:notification.archivingError',
} as const;

import { palette } from '../variables';
import ArchiveIcon from '@/static/icons/archive.svg';
import BlockIcon from '@/static/icons/block.svg';
import CloseIcon from '@/static/icons/close.svg';
import SearchIcon from '@/static/icons/search.svg';
import SearchWithBackgroundIcon from '@/static/icons/search-with-background.svg';
import BackIcon from '@/static/icons/back.svg';
import EditIcon from '@/static/icons/edit.svg';
import SendIcon from '@/static/icons/send.svg';
import MenuDotsIcon from '@/static/icons/menu-dots.svg';
import MenuLinesIcon from '@/static/icons/menu-lines.svg';
import DeleteIcon from '@/static/icons/delete.svg';
import PrevIcon from '@/static/icons/prev.svg';
import NextIcon from '@/static/icons/next.svg';
import FilterIcon from '@/static/icons/icon-filter.svg';
import ForwardIcon from '@/static/icons/forward.svg';
import RewindIcon from '@/static/icons/rewind.svg';
import TooltipIcon from '@/static/icons/tooltip.svg';
import DeleteOutlined from '@/static/icons/icon-delete.svg';
import CloseOutlined from '@/static/icons/icon-close.svg';

export const variants = {
  dark: {
    backgroundColor: palette.purple,
    color: palette.orange,

    ['&: active, &: visited']: {
      backgroundColor: palette.purpleMid,
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
    backgroundColor: palette.greyMid,
    color: palette.greyFaded,

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
      border: `2px solid ${palette.purpleDark}`,
      color: palette.purpleDark,
      outline: `none`,
    },
  },
};

export type ButtonIcon =
  | 'back'
  | 'close'
  | 'closeOutlined'
  | 'delete'
  | 'deleteOutlined'
  | 'edit'
  | 'filter'
  | 'forward'
  | 'menuDots'
  | 'menuLines'
  | 'next'
  | 'prev'
  | 'rewind'
  | 'search'
  | 'send'
  | 'tooltip';

export const iconVariants = {
  archive: {
    backgroundImage: `url(${ArchiveIcon})`,
  },
  back: {
    backgroundImage: `url(${BackIcon})`,
  },
  block: {
    backgroundImage: `url(${BlockIcon})`,
  },
  close: {
    backgroundImage: `url(${CloseIcon})`,
  },
  closeOutlined: {
    backgroundImage: `url(${CloseOutlined})`,
  },
  delete: {
    backgroundImage: `url(${DeleteIcon})`,
  },
  deleteOutlined: {
    backgroundImage: `url(${DeleteOutlined})`,
  },
  edit: {
    backgroundImage: `url(${EditIcon})`,
  },
  filter: {
    backgroundImage: `url(${FilterIcon})`,
  },
  forward: {
    backgroundImage: `url(${ForwardIcon})`,
  },
  menuDots: {
    backgroundImage: `url(${MenuDotsIcon})`,
  },
  menuLines: {
    backgroundImage: `url(${MenuLinesIcon})`,
  },
  next: {
    backgroundImage: `url(${NextIcon})`,
  },
  prev: {
    backgroundImage: `url(${PrevIcon})`,
  },
  rewind: {
    backgroundImage: `url(${RewindIcon})`,
  },
  search: {
    backgroundImage: `url(${SearchIcon})`,
  },
  searchWithBackground: {
    backgroundImage: `url(${SearchWithBackgroundIcon})`,
  },
  send: {
    backgroundImage: `url(${SendIcon})`,
  },
  tooltip: {
    backgroundImage: `url(${TooltipIcon})`,
  },
};

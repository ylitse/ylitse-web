import { palette } from '../variables';
import ArchiveIcon from '@/static/icons/archive.svg';
import BackIcon from '@/static/icons/back.svg';
import BlockIcon from '@/static/icons/block.svg';
import CloseIcon from '@/static/icons/close.svg';
import CloseWithBackgroundIcon from '@/static/icons/close-with-background.svg';
import DeleteIcon from '@/static/icons/delete.svg';
import EditIcon from '@/static/icons/edit.svg';
import FilterIcon from '@/static/icons/filter.svg';
import ForwardIcon from '@/static/icons/forward.svg';
import MenuDotsIcon from '@/static/icons/menu-dots.svg';
import MenuLinesIcon from '@/static/icons/menu-lines.svg';
import NextIcon from '@/static/icons/next.svg';
import PrevIcon from '@/static/icons/prev.svg';
import RewindIcon from '@/static/icons/rewind.svg';
import SearchIcon from '@/static/icons/search.svg';
import SearchWithBackgroundIcon from '@/static/icons/search-with-background.svg';
import SendIcon from '@/static/icons/send.svg';
import TooltipIcon from '@/static/icons/tooltip.svg';

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
  | 'archive'
  | 'back'
  | 'block'
  | 'close'
  | 'closeWithBackground'
  | 'delete'
  | 'edit'
  | 'filter'
  | 'forward'
  | 'menuDots'
  | 'menuLines'
  | 'next'
  | 'prev'
  | 'rewind'
  | 'search'
  | 'searchWithBackground'
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
  closeWithBackground: {
    backgroundImage: `url(${CloseWithBackgroundIcon})`,
  },
  delete: {
    backgroundImage: `url(${DeleteIcon})`,
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

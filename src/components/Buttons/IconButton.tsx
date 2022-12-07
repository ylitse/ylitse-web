import { ComponentPropsWithoutRef, ElementType } from 'react';
import styled from 'styled-components';
import CloseIcon from '../../static/icons/close.svg';
import SearchIcon from '../../static/icons/search.svg';
import BackIcon from '../../static/icons/back.svg';
import EditIcon from '../../static/icons/edit.svg';
import SendIcon from '../../static/icons/send.svg';
import MenuIcon from '../../static/icons/menu.svg';
import DeleteIcon from '../../static/icons/delete.svg';
import PrevIcon from '../../static/icons/prev.svg';
import NextIcon from '../../static/icons/next.svg';
import ForwardIcon from '../../static/icons/forward.svg';
import RewindIcon from '../../static/icons/rewind.svg';
import TooltipIcon from '../../static/icons/tooltip.svg';

export type ButtonIcon =
  | 'search'
  | 'back'
  | 'edit'
  | 'send'
  | 'close'
  | 'menu'
  | 'delete'
  | 'prev'
  | 'next'
  | 'rewind'
  | 'forward'
  | 'tooltip';

type ButtonProps<T extends ElementType> = {
  variant?: ButtonIcon;
} & ComponentPropsWithoutRef<T>;

const IconButton = <T extends ElementType = 'button'>({
  variant = 'close',
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return <StyledIconButton variant={variant} {...rest} aria-label={variant} />;
};

const variantOptions = {
  close: {
    backgroundImage: `url(${CloseIcon})`,
  },
  search: {
    backgroundImage: `url(${SearchIcon})`,
  },
  back: {
    backgroundImage: `url(${BackIcon})`,
  },
  edit: {
    backgroundImage: `url(${EditIcon})`,
  },
  send: {
    backgroundImage: `url(${SendIcon})`,
  },
  menu: {
    backgroundImage: `url(${MenuIcon})`,
  },
  delete: {
    backgroundImage: `url(${DeleteIcon})`,
  },
  prev: {
    backgroundImage: `url(${PrevIcon})`,
  },
  next: {
    backgroundImage: `url(${NextIcon})`,
  },
  rewind: {
    backgroundImage: `url(${RewindIcon})`,
  },
  forward: {
    backgroundImage: `url(${ForwardIcon})`,
  },
  tooltip: {
    backgroundImage: `url(${TooltipIcon})`,
  },
};

const StyledIconButton = styled.button<{ variant: ButtonIcon }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-size: contain;
  background-repeat: no-repeat;
  height: 2rem;
  width: 2rem;
  background-color: transparent;
  border: none;
  appearance: none;
  z-index: 10;
  cursor: pointer;
  ${({ variant }) => variant && variantOptions[variant]}
`;

export default IconButton;

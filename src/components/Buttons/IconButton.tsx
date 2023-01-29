import { ComponentPropsWithoutRef, ElementType } from 'react';
import styled, { css } from 'styled-components';
import CloseIcon from '@/static/icons/close.svg';
import SearchIcon from '@/static/icons/search-with-background.svg';
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

import { TextVariant } from '../Text/variants';
import Text from '../Text';
import { Color } from '../variables';

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

type ButtonProps<T extends ElementType> = {
  variant: ButtonIcon;
  sizeInPx: number;
  text?: { variant: TextVariant; color: Color; text: string };
} & ComponentPropsWithoutRef<T>;

const IconButton = <T extends ElementType = 'button'>({
  variant,
  sizeInPx,
  text,
  onClick,
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return (
    <Container onClick={onClick}>
      <StyledIconButton
        variant={variant}
        size={sizeInPx}
        {...rest}
        aria-label={variant}
      ></StyledIconButton>
      {text && (
        <Text variant={text.variant} color={text.color}>
          {text.text}
        </Text>
      )}
    </Container>
  );
};

const variantOptions = {
  back: {
    backgroundImage: `url(${BackIcon})`,
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
  send: {
    backgroundImage: `url(${SendIcon})`,
  },
  tooltip: {
    backgroundImage: `url(${TooltipIcon})`,
  },
};

const StyledIconButton = styled.button<{
  variant: ButtonIcon;
  size: number;
}>`
  appearance: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  cursor: pointer;
  z-index: 10;
  ${({ size }) => css`
    height: ${size}px;
    width: ${size}px;
  `}
  ${({ variant }) => variant && variantOptions[variant]}
`;

const Container = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;

  &:hover {
    opacity: 0.7;
  }
`;

export default IconButton;

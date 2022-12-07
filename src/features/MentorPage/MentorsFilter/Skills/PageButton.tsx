import styled, { css } from 'styled-components';
import * as cssVariables from '../../../../components/variables';
import { THREE_DOTS } from './usePagination';

type Props = {
  isSelected: boolean;
  onClick: () => void;
  page: string | number;
};

export const PageButton = ({ isSelected, onClick, page }: Props) => {
  const handleOnClick = () => {
    if (page === THREE_DOTS) return;

    onClick();
  };

  return (
    <PageNumber
      isSelected={isSelected}
      onClick={handleOnClick}
      isClickable={page !== THREE_DOTS}
    >
      {page}
    </PageNumber>
  );
};

const PageNumber = styled.span<{ isSelected: boolean; isClickable: boolean }>`
  padding: 0.2rem 1rem;
  border-radius: 16%;

  ${cssVariables.basicBalooText}

  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: ${cssVariables.palette.blue2};
        `
      : css`
          color: ${cssVariables.palette.darkpurple};
        `}

  ${({ isClickable }) =>
    isClickable &&
    css`
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    `};
`;

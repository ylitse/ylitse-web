import styled, { css } from 'styled-components';
import Text from '@/components/Text';

import type { Props } from '../LanguageDropdown/LangItem';
import { palette } from '@/components/variables';

export const LanguageItem: React.FC<Props> = ({
  changeLang,
  isSelected,
  text,
}) => (
  <Link
    isSelected={isSelected}
    onClick={isSelected ? e => e.stopPropagation() : changeLang}
  >
    <Text
      color={isSelected ? 'darkblue' : 'purple'}
      variant={isSelected ? 'linkDisabledMobile' : 'linkMobile'}
    >
      {text}
    </Text>
  </Link>
);

const Link = styled.a<{ isSelected: boolean }>`
  line-height: 56px;
  padding: 0 2rem;

  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: ${palette.blue2};
          cursor: default;
        `
      : css`
          cursor: pointer;
        `}
`;

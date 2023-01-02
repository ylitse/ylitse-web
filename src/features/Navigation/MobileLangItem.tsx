import styled from 'styled-components';
import Text from '@/components/Text';
import type { LangItemProps } from './LangItem';

const Link = styled.a<{ isSelected: boolean }>`
  padding: 0 2rem;
  cursor: ${({ isSelected }) => (isSelected ? 'default' : 'pointer')};
`;

export const MobileLangItem: React.FC<LangItemProps> = ({
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
      variant={isSelected ? 'linkDisabled' : 'linkMobile'}
    >
      {text}
    </Text>
  </Link>
);

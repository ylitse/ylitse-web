import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import SearchIconImg from '@/static/icons/search.svg';
import { palette } from '../constants';

type Variant = 'small' | 'normal';

type SearchProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  variant: Variant;
  className?: string;
};

const sizingMap: Record<Variant, FlattenSimpleInterpolation> = {
  normal: css`
    padding: 1rem 4.5rem;
  `,
  small: css`
    padding: 0.75rem 2rem 0.75rem 4rem;
  `,
};

const SearchBar: React.FC<SearchProps> = ({
  onChange,
  variant,
  className,
  ...props
}) => (
  <SearchBox className={className}>
    <SearchIcon />
    <SearchInput
      type="text"
      variant={variant}
      {...props}
      onChange={e => onChange(e.target.value)}
    ></SearchInput>
  </SearchBox>
);

const SearchInput = styled.input<{ variant: Variant }>`
  border: ${palette.purple} solid 1px;
  border-radius: 1.75rem;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  font-family: 'Source Sans Pro';
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 400;
  padding: 1rem 4.5rem;
  width: 100%;

  ${({ variant }) => sizingMap[variant]}

  &:focus {
    outline: ${palette.purple} solid 2px;
  }
`;

const SearchBox = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  position: relative;
`;

const SearchIcon = styled.div`
  background-image: url(${SearchIconImg});
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex: 0 0 auto;
  height: 2rem;
  left: 1.5rem;
  position: absolute;
  width: 2rem;
`;

export default SearchBar;

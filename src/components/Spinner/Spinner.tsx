import styled, { css } from 'styled-components';
import { animations, palette } from '../variables';

type Variant = 'large' | 'medium' | 'small' | 'tiny';

type Props = {
  variant: Variant;
  isDark?: boolean;
  centered?: boolean;
};

export const Spinner: React.FC<Props> = ({
  variant,
  isDark = false,
  centered = true,
}) => {
  return (
    <LoadingCircle
      id="loading"
      role="progressbar"
      variant={variant}
      isDark={isDark}
      centered={centered}
    />
  );
};

const sizes: Record<Variant, number> = {
  large: 9.7,
  medium: 5,
  small: 2,
  tiny: 1,
};

const LoadingCircle = styled.div<{
  variant: Variant;
  isDark: boolean;
  centered: boolean;
}>`
  ${({ variant, isDark }) => {
    const diameter = sizes[variant];
    const borderWidth = diameter * 0.2;
    const border = `${borderWidth}rem solid ${
      isDark ? palette.blue : palette.white
    }`;
    return css`
      border: ${border};
      height: ${diameter}rem;
      margin-bottom: ${diameter / 2}rem;
      margin-top: ${diameter / 2}rem;
      width: ${diameter}rem;
    `;
  }}
  ${({ isDark }) => {
    const borderColor = isDark ? palette.greyLight : palette.whiteOpacity;
    return css`
      border-bottom-color: ${borderColor};
      border-left-color: ${borderColor};
      border-right-color: ${borderColor};
    `;
  }}

  ${({ centered }) =>
    centered &&
    css`
      margin-left: auto;
      margin-right: auto;
    `}

  animation: ${animations.spin}
  border-radius: 50%;
`;

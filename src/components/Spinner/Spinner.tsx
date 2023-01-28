import styled, { keyframes } from 'styled-components';
import { palette } from '../variables';

type Variant = 'large' | 'medium' | 'small';

type Props = {
  variant: Variant;
};

export const Spinner: React.FC<Props> = ({ variant }) => {
  return <LoadingCircle id="loading" role="progressbar" variant={variant} />;
};

const spinAnimation = keyframes`
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
`;

const sizes: Record<Variant, number> = {
  large: 9.7,
  medium: 5,
  small: 2,
};

const LoadingCircle = styled.div<{ variant: Variant }>`
  ${({ variant }) => {
    const diameter = sizes[variant];
    const borderWidth = diameter * 0.2;
    const border = `${borderWidth}rem solid ${palette.white}`;
    return `
      height: ${diameter}rem; 
      width: ${diameter}rem; 
      border: ${border};
      margin-top: ${diameter / 2}rem;
      margin-bottom: ${diameter / 2}rem;
      `;
  }}
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: ${spinAnimation};
  animation-timing-function: linear;
  border-bottom-color: ${palette.whiteOpacity};
  border-left-color: ${palette.whiteOpacity};
  border-radius: 50%;
  border-right-color: ${palette.whiteOpacity};
  margin-left: auto;
  margin-right: auto;
  transition: all 0.5s ease-in;
`;

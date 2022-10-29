import styled, { keyframes } from 'styled-components';
import { palette } from '../variables';

type Variant = 'large' | 'medium' | 'small';

type Props = {
  variant: Variant;
};

export const Spinner: React.FC<Props> = ({ variant }) => {
  return <LoadingCircle variant={variant} />;
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
      `;
  }}
  border-radius: 50%;
  border-left-color: ${palette.spinnerBackgrond};
  border-bottom-color: ${palette.spinnerBackgrond};
  border-right-color: ${palette.spinnerBackgrond};
  animation-name: ${spinAnimation};
  animation-duration: 1.5s;
  transition: all 0.5s ease-in;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

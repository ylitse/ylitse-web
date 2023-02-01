import styled from 'styled-components';
import { animations, palette } from '../variables';

type Variant = 'large' | 'medium' | 'small';

type Props = {
  variant: Variant;
};

export const Spinner: React.FC<Props> = ({ variant }) => {
  return <LoadingCircle id="loading" role="progressbar" variant={variant} />;
};

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
  animation: ${animations.spin}
  border-bottom-color: ${palette.whiteOpacity};
  border-left-color: ${palette.whiteOpacity};
  border-radius: 50%;
  border-right-color: ${palette.whiteOpacity};
  margin-left: auto;
  margin-right: auto;
`;

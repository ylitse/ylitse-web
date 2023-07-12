import { ComponentPropsWithoutRef, ElementType } from 'react';
import Button from './Button';

type ButtonProps<T extends ElementType> = {
  icon: 'archive' | 'block' | 'return';
  text: string;
} & ComponentPropsWithoutRef<T>;

const StatusButton = <T extends ElementType = 'button'>({
  icon,
  text,
  ...rest
}: ButtonProps<T>): JSX.Element => (
  <Button
    leftIcon={icon}
    sizeInPx={24}
    text={{
      color: 'purple',
      text,
      variant: 'link',
    }}
    {...rest}
  />
);

export default StatusButton;

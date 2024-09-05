import { ComponentPropsWithoutRef, ElementType } from 'react';

import Button from './Button';
import { DEFAULT_ICON_SIZE } from '../constants';

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
    sizeInPx={DEFAULT_ICON_SIZE.SMALL}
    text={{
      color: 'purple',
      text,
      variant: 'link',
    }}
    {...rest}
  />
);

export default StatusButton;

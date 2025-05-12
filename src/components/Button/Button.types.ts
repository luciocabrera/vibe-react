import type { ComponentProps } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

import type { ColorVariants, SizeVariants } from './Button.stylex';

export type TButtonProps = ComponentProps<'button'> & {
  children: React.ReactNode;
  customStylex?: StyleXStyles | StyleXStyles[];
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: SizeVariants;
  variant?: ColorVariants;
};

import type { ComponentProps } from 'react';

import type { ColorVariants, SizeVariants } from './Button.stylex';

export type TButtonProps = ComponentProps<'button'> & {
  children: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: SizeVariants;
  variant?: ColorVariants;
};


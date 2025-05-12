import * as stylex from '@stylexjs/stylex';

import { colorVariants, sizeVariants, styles } from './Button.stylex';
import type { TButtonProps } from './Button.types';

const Button = ({
  children,
  customStylex,
  isDisabled = false,
  isLoading = false,
  size = 'lg',
  type = 'button',
  variant = 'primary',
  ...props
}: TButtonProps) => (
  <button
    {...props}
    {...stylex.props(
      styles.base,
      colorVariants[variant],
      sizeVariants[size],
      isDisabled && styles.disabled,
      isLoading && styles.loading,
      customStylex // merge custom styles last
    )}
    disabled={isDisabled || isLoading}
    type={type}
  >
    {isLoading ? 'Loading...' : children}
  </button>
);

export default Button;

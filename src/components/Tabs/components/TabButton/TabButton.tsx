import * as stylex from '@stylexjs/stylex';

import { styles } from './TabButton.stylex';
import type { TTabItemProps } from './TabButton.types';

const TabButton = ({ active, children, ref, ...props }: TTabItemProps) => (
  <button
    {...props}
    ref={ref}
    type='button'
    {...stylex.props(styles.button, active && styles.active)}
  >
    {children}
  </button>
);

export default TabButton;

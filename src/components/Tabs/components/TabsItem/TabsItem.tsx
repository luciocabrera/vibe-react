import * as stylex from '@stylexjs/stylex';

import { styles } from './TabsItem.stylex';
import type { TTabItemProps } from './TabsItem.types';

const TabsItem = ({ active, children, ref, ...props }: TTabItemProps) => (
  <button
    ref={ref}
    type='button'
    {...stylex.props(styles.button, active && styles.active)}
    {...props}
  >
    {children}
  </button>
);

export default TabsItem;

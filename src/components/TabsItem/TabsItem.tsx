import stylex from '@stylexjs/stylex';

import { styles } from './TabsItem.stylex';
import type { TTabItemProps } from './TabsItem.types';

// import { styles as stylesMainHeader } from '~/components/MainHeader/MainHeader.stylex';

const TabsItem = ({ active, children, ref, ...props }: TTabItemProps) => (
  <button
    ref={ref}
    type='button'
    {...stylex.props(
      // stylesMainHeader.titleContainer,
      styles.button,
      active && styles.active
    )}
    {...props}
  >
    {children}
  </button>
);

export default TabsItem;


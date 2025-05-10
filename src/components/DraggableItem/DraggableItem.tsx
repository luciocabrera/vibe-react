import * as stylex from '@stylexjs/stylex';

import { styles } from './DraggableItem.stylex';
import type { TDraggableItemProps } from './DraggableItem.types';

const DraggableItem = ({
  activeId,
  children,
  id,
  label,
  ...props
}: TDraggableItemProps) => (
  <li
    {...props}
    {...stylex.props(styles.li, activeId === id && styles.liDragging)}
    draggable
  >
    <div {...stylex.props(styles.labelContainer)}>
      <span {...stylex.props(styles.dragIcon)}>{'≡'}</span>
      {label}
    </div>
    {children}
  </li>
);

export default DraggableItem;


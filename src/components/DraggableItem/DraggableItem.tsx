import { memo } from 'react';
import * as stylex from '@stylexjs/stylex';

import { styles } from './DraggableItem.stylex';
import type { TDraggableItemProps } from './DraggableItem.types';

const DraggableItem = memo(
  ({
    activeId,
    children,
    id,
    label,
    onDragEnd,
    onDragEnter,
    onDragStart,
    ...props
  }: TDraggableItemProps) => (
    <li
      {...props}
      {...stylex.props(styles.li, activeId === id && styles.liDragging)}
      draggable
      onDragEnd={onDragEnd}
      onDragEnter={() => onDragEnter(id)}
      onDragOver={e => e.preventDefault()}
      onDragStart={() => onDragStart(id)}
    >
      <div {...stylex.props(styles.labelContainer)}>
        <span {...stylex.props(styles.dragIcon)}>{'≡'}</span>
        {label}
      </div>
      {children}
    </li>
  )
);

export default DraggableItem;


import * as stylex from '@stylexjs/stylex';

import { DraggableItem } from '../DraggableItem';

import { styles } from './DraggableList.stylex';
import type { TDraggableListProps } from './DraggableList.types';
import { useDraggableList } from './hooks';

const DraggableList = ({ items, onOrderChange }: TDraggableListProps) => {
  const { dragItemId, handleDragEnd, handleDragEnter, handleDragStart, list } =
    useDraggableList({ initialItems: items, onOrderChange });

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  return (
    <ul {...stylex.props(styles.ul)}>
      {list.map((item) => (
        <DraggableItem
          key={item.id}
          activeId={dragItemId.current}
          id={String(item.id)}
          onDragEnd={handleDragEnd}
          onDragEnter={() => handleDragEnter(item.id)}
          onDragOver={handleDragOver}
          onDragStart={() => handleDragStart(item.id)}
        >
          {item.child}
        </DraggableItem>
      ))}
    </ul>
  );
};

export default DraggableList;

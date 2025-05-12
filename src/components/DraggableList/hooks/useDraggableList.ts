import { useEffect, useRef, useState } from 'react';

import type {
  TDraggableItemType,
  TUseDraggableListProps,
} from '../DraggableList.types';

// Hook for managing draggable list functionality
export const useDraggableList = ({
  initialItems,
  onOrderChange,
}: TUseDraggableListProps) => {
  const [list, setList] = useState<TDraggableItemType[]>(initialItems);
  const dragItemId = useRef<number | string | null>(null);
  const dragOverItemId = useRef<number | string | null>(null);

  // Update local state when initial items change
  useEffect(() => {
    setList(initialItems);
  }, [initialItems]);

  const handleDragStart = (id: number | string) => {
    dragItemId.current = id;
  };

  const handleDragEnter = (id: number | string) => {
    dragOverItemId.current = id;
  };

  const handleDragEnd = () => {
    const fromId = dragItemId.current;
    const toId = dragOverItemId.current;

    if (!fromId || !toId || fromId === toId) return;

    const fromIndex = list.findIndex((item) => item.id === fromId);
    const toIndex = list.findIndex((item) => item.id === toId);

    if (fromIndex < 0 || toIndex < 0) return;

    const updatedList = [...list];
    const [movedItem] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedItem);

    setList(updatedList);

    if (onOrderChange) {
      onOrderChange(updatedList);
    }

    dragItemId.current = null;
    dragOverItemId.current = null;
  };

  return {
    dragItemId,
    handleDragEnd,
    handleDragEnter,
    handleDragStart,
    list,
  };
};

import { useState } from 'react';

type TUseOrderedListProps<T> = {
  getItemId: (item: T) => number | string;
  items: T[];
  onOrderChange: (newItems: T[]) => void;
};

export const useOrderedList = <T>({
  getItemId,
  items,
  onOrderChange,
}: TUseOrderedListProps<T>) => {
  const [dragItemId, setDragItemId] = useState<number | string | null>(null);

  const handleDragStart = (id: number | string) => {
    setDragItemId(id);
  };

  const handleDragEnd = () => {
    setDragItemId(null);
  };

  const handleDragEnter = (id: number | string) => {
    if (!dragItemId || dragItemId === id) return;

    const fromIndex = items.findIndex(item => getItemId(item) === dragItemId);
    const toIndex = items.findIndex(item => getItemId(item) === id);

    if (fromIndex < 0 || toIndex < 0) return;

    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);

    onOrderChange(newItems);
  };

  return {
    dragItemId,
    handleDragEnd,
    handleDragEnter,
    handleDragStart,
  };
}


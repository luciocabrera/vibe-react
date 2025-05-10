import { useCallback,useState } from 'react';

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

  const handleDragStart = useCallback((id: number | string) => {
    setDragItemId(id);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDragItemId(null);
  }, []);

  const handleDragEnter = useCallback(
    (id: number | string) => {
      if (!dragItemId || dragItemId === id) return;

      const fromIndex = items.findIndex(item => getItemId(item) === dragItemId);
      const toIndex = items.findIndex(item => getItemId(item) === id);

      if (fromIndex < 0 || toIndex < 0) return;

      const newItems = [...items];
      const [movedItem] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, movedItem);

      onOrderChange(newItems);
    },
    [dragItemId, items, getItemId, onOrderChange]
  );

  return {
    dragItemId,
    handleDragEnd,
    handleDragEnter,
    handleDragStart,
  };
}


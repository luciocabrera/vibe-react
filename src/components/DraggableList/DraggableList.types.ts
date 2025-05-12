import type { ReactNode } from 'react';

export type TDraggableListProps = {
  items: TDraggableItemType[];
  onOrderChange?: (items: TDraggableItemType[]) => void;
};

export type TDraggableItemType = {
  child: ReactNode;
  id: number | string;
};

export type TUseDraggableListProps = {
  initialItems: TDraggableItemType[];
  onOrderChange?: (items: TDraggableItemType[]) => void;
};

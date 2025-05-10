import type { ComponentProps, ReactNode } from 'react';

export type TDraggableItemProps = ComponentProps<'li'> & {
  activeId: number | string | null;
  children?: ReactNode;
  id: number | string;
  label?: string;
  onDragEnd: () => void;
  onDragEnter: (id: number | string) => void;
  onDragStart: (id: number | string) => void;
};


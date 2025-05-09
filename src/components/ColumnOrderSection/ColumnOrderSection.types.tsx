import type { ColumnDef } from '../../App';

export type ColumnOrderSectionProps = {
  columns: ColumnDef[];
  columnOrder: string[];
  setColumnOrder: (order: string[]) => void;
  visibleColumns?: Set<string>;
  setVisibleColumns?: (columns: Set<string>) => void;
};


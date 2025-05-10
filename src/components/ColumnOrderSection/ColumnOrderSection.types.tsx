import type { ColumnDef } from '../../App';

export type TColumnOrderSectionProps = {
  columnOrder: string[];
  columns: ColumnDef[];
  setColumnOrder: (order: string[]) => void;
  setVisibleColumns?: (columns: Set<string>) => void;
  visibleColumns?: Set<string>;
};


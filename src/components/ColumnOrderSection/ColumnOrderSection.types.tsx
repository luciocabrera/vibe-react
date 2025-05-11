import type { ColumnDef } from '../../App';

// TODO: Get the ColumnDef type from the library or shared types
export type TColumnOrderSectionProps = {
  columnOrder: string[];
  columns: ColumnDef[];
  setColumnOrder: (order: string[]) => void;
  setVisibleColumns?: (columns: Set<string>) => void;
  visibleColumns?: Set<string>;
};


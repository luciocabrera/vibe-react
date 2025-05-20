import type { Table } from '@tanstack/react-table';
import type { Virtualizer } from '@tanstack/react-virtual';

export type TTableBodyProps<TData> = {
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  table: Table<TData>;
  tableContainerRef: React.RefObject<HTMLDivElement | null>;
  virtualPaddingLeft: number | undefined;
  virtualPaddingRight: number | undefined;
};

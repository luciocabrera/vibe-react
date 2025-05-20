import type { Table } from '@tanstack/react-table';
import type { Virtualizer } from '@tanstack/react-virtual';

export type TTableHeadProps<TData> = {
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  table: Table<TData>;
  virtualPaddingLeft: number | undefined;
  virtualPaddingRight: number | undefined;
};

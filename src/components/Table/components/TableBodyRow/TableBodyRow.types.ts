import type { Row } from '@tanstack/react-table';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

export type TTableBodyRowProps<TData> = {
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  row: Row<TData>;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  virtualPaddingLeft: number | undefined;
  virtualPaddingRight: number | undefined;
  virtualRow: VirtualItem;
};

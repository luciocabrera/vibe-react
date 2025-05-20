import type { HeaderGroup } from '@tanstack/react-table';
import type { Virtualizer } from '@tanstack/react-virtual';

export type TTableHeadRowProps<TData> = {
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  headerGroup: HeaderGroup<TData>;
  virtualPaddingLeft: number | undefined;
  virtualPaddingRight: number | undefined;
};

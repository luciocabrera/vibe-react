import type { Header } from '@tanstack/react-table';

export type TTableHeadCellProps<TData> = {
  header: Header<TData, unknown>;
};

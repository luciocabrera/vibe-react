import type { ColumnDef } from '@tanstack/react-table';

export type TTableProps<TData> = { columns: ColumnDef<TData>[]; data: TData[] };

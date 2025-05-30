import type { ColumnDef } from '@tanstack/react-table';

import type { ColumnDef as AppColumnDef } from '../../App';

export type TTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  showHeader?: boolean;
};

// New enhanced table props for the refactored component
export type TEnhancedTableProps = {
  columns: AppColumnDef[];
  data: Record<string, any>[];
  showHeader?: boolean;
};

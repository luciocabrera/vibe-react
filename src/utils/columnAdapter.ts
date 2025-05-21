import type { ColumnDef as TanStackColumnDef } from '@tanstack/react-table';

import type { ColumnDef } from '../App';

/**
 * Converts our application's column definitions to TanStack Table column definitions
 */
export function convertToTanStackColumns<TData extends Record<string, unknown>>(
  appColumns: ColumnDef[]
): TanStackColumnDef<TData>[] {
  return appColumns.map((col) => ({
    accessorKey: col.key as keyof TData,
    enableSorting: col.sortable !== false,
    header: col.label,
    minSize: 100,
    size: col.type === 'number' ? 120 : 200,
  }));
}

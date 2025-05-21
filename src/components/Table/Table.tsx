import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  type ColumnOrderState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  // type VisibilityState,
} from '@tanstack/react-table';

import { TableContainer } from './components/TableContainer';
import { styles } from './Table.stylex';
import type { TTableProps } from './Table.types';

const Table = <TData extends Record<string, unknown>>({
  columns,
  data,
}: TTableProps<TData>) => {
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnPinning, setColumnPinning] = useState({});

  // const visibleColumns = visible.reduce(
  //   (obj, item) => {
  //     obj[item.id] = true;
  //     return obj;
  //   },
  //   {} as Record<string, boolean>
  // );
  // const hiddenColumns = hidden.reduce(
  //   (obj, item) => {
  //     obj[item.id] = false;
  //     return obj;
  //   },
  //   {} as Record<string, boolean>
  // );

  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
  //   ...visibleColumns,
  //   ...hiddenColumns,
  // });

  const table = useReactTable({
    columnResizeMode: 'onChange',
    columns,
    data,
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    // onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnOrder,
      columnPinning,
      // columnVisibility,
    },
  });

  //All important CSS styles are included as stylex styles
  return (
    <div {...stylex.props(styles.app)}>
      <TableContainer table={table} />
    </div>
  );
};

export default Table;

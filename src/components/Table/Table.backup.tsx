// Backup of Table.tsx before dynamic settings refactor
// (Created on 2025-05-21)

import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  type ColumnOrderState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';

import { MainHeader } from '../MainHeader';

import { TableContainer } from './components/TableContainer';
import { styles } from './Table.stylex';
import type { TTableProps } from './Table.types';

const Table = <TData extends Record<string, unknown>>({
  columns,
  data,
  showHeader = true,
}: TTableProps<TData>) => {
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnPinning, setColumnPinning] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    columnResizeMode: 'onChange',
    columns,
    data,
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnOrder,
      columnPinning,
      columnVisibility,
    },
  });

  return (
    <section {...stylex.props(styles.section)}>
      {showHeader && (
        <MainHeader
          inverse
          title={'title'}
        />
      )}
      <TableContainer table={table} />
    </section>
  );
};

export default Table;

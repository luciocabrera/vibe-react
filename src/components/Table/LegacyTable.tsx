import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import type { ColumnOrderState, VisibilityState } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { MainHeader } from '../MainHeader';
import { SettingsButton } from '../SettingsButton';

import { TableContainer } from './components/TableContainer';
import { styles } from './Table.stylex';
import type { TTableProps } from './Table.types';

const LegacyTable = <TData extends Record<string, unknown>>({
  columns,
  data,
  showHeader = true,
}: TTableProps<TData>) => {
  // Settings state
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnPinning, setColumnPinning] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

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
          title={'Table'}
        >
          <SettingsButton onClick={handleOpenDrawer} />
        </MainHeader>
      )}
      <TableContainer table={table} />
    </section>
  );
};

export default LegacyTable;

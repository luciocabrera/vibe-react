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

// const LOCAL_STORAGE_KEY = 'vibe-table-settings';

const Table = <TData extends Record<string, unknown>>({
  columns,
  data,
  showHeader = true,
}: TTableProps<TData>) => {
  // Settings state
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnPinning, setColumnPinning] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [, setDrawerOpen] = useState(false);
  // const [drawerTab, setDrawerTab] = useState<'columns' | 'filters' | 'sorting'>(
  //   'filters'
  // );
  // // Staged settings for the drawer (not applied until Accept)
  // const [stagedColumnOrder, setStagedColumnOrder] = useState<ColumnOrderState>(
  //   []
  // );
  // const [stagedVisibleColumns, setStagedVisibleColumns] = useState<Set<string>>(
  //   new Set()
  // );

  // Load settings from localStorage on mount
  // useEffect(() => {
  //   const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   if (saved) {
  //     try {
  //       const parsed = JSON.parse(saved);
  //       setColumnOrder(parsed.columnOrder || []);
  //       setColumnVisibility(parsed.columnVisibility || {});
  //     } catch {
  //       // Ignore parse errors
  //     }
  //   }
  // }, []);

  // // Save settings to localStorage when applied
  // const persistSettings = (
  //   order: ColumnOrderState,
  //   visibility: VisibilityState
  // ) => {
  //   localStorage.setItem(
  //     LOCAL_STORAGE_KEY,
  //     JSON.stringify({ columnOrder: order, columnVisibility: visibility })
  //   );
  // };

  // // Open drawer and stage current settings
  const handleOpenDrawer = () => {
    // setStagedColumnOrder(columnOrder);
    // setStagedVisibleColumns(
    //   new Set(Object.keys(columnVisibility).filter((k) => columnVisibility[k]))
    // );
    setDrawerOpen(true);
  };

  // // Accept changes: apply staged settings and persist
  // const handleAccept = () => {
  //   setColumnOrder(stagedColumnOrder);
  //   // Convert Set to VisibilityState
  //   const newVisibility: VisibilityState = {};
  //   (originalColumns || []).forEach((col) => {
  //     newVisibility[col.key] = stagedVisibleColumns.has(col.key);
  //   });
  //   setColumnVisibility(newVisibility);
  //   persistSettings(stagedColumnOrder, newVisibility);
  //   setDrawerOpen(false);
  // };

  // // Cancel changes: just close drawer
  // const handleCancel = () => {
  //   setDrawerOpen(false);
  // };

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

export default Table;

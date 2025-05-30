import { useEffect, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import type { VisibilityState } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { convertToTanStackColumns } from '../../utils/columnAdapter';
import { MainHeader } from '../MainHeader';
import type { TSortCol } from '../sections/SortBySection/SortBySection.types';
import { SettingsButton } from '../SettingsButton';
import { TableSettingsDrawer } from '../TableSettingsDrawer';

import { TableContainer } from './components/TableContainer';
import { styles } from './Table.stylex';
import type { TEnhancedTableProps } from './Table.types';

const LOCAL_STORAGE_KEY = 'vibe-table-settings';

const Table = ({
  columns: appColumns,
  data: rawData,
  showHeader = true,
}: TEnhancedTableProps) => {
  // Table settings state
  const [columnOrder, setColumnOrder] = useState<string[]>(
    appColumns.map((col) => col.key)
  );
  const [columnPinning, setColumnPinning] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(appColumns.map((col) => col.key))
  );

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'columns' | 'filters' | 'sorting'>(
    'filters'
  );
  const [isPinned, setIsPinned] = useState(false);

  // Filter and sort state
  const [filterState, setFilterState] = useState<Record<string, string[]>>({});
  const [rangeState, setRangeState] = useState<
    Record<string, [number | '', number | '']>
  >({});
  const [sortState, setSortState] = useState<TSortCol[]>([]);

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.columnOrder) setColumnOrder(parsed.columnOrder);
        if (parsed.columnVisibility)
          setColumnVisibility(parsed.columnVisibility);
        if (parsed.visibleColumns) {
          setVisibleColumns(new Set(parsed.visibleColumns));
        }
        if (parsed.isPinned !== undefined) setIsPinned(parsed.isPinned);
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Initialize filter options when data changes
  useEffect(() => {
    const newFilterState: Record<string, string[]> = {};
    appColumns
      .filter((col) => col.filterable)
      .forEach((col) => {
        const opts = Array.from(
          new Set(rawData.map((d) => d[col.key]).filter(Boolean))
        );
        newFilterState[col.key] = opts;
      });
    setFilterState(newFilterState);

    // Reset range state for new data
    const newRangeState: Record<string, [number | '', number | '']> = {};
    appColumns
      .filter((col) => col.rangeFilter)
      .forEach((col) => {
        newRangeState[col.key] = ['', ''];
      });
    setRangeState(newRangeState);
  }, [rawData, appColumns]);

  // Save settings to localStorage when they change
  useEffect(() => {
    const settings = {
      columnOrder,
      columnVisibility,
      isPinned,
      visibleColumns: Array.from(visibleColumns),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  }, [columnOrder, columnVisibility, visibleColumns, isPinned]);

  // Data processing: filtering
  let filteredData = rawData.filter((row) =>
    appColumns
      .filter((col) => col.filterable)
      .every(
        (col) =>
          filterState[col.key].length === 0 ||
          filterState[col.key].includes(row[col.key])
      )
  );

  // Range filtering
  const inRange = (val: number | '-', min: number | '', max: number | '') => {
    if (val === '-' || isNaN(Number(val))) return false;
    if (min !== '' && Number(val) < min) return false;
    if (max !== '' && Number(val) > max) return false;
    return true;
  };

  filteredData = filteredData.filter((row) =>
    appColumns
      .filter((col) => col.rangeFilter)
      .every((col) =>
        inRange(row[col.key], rangeState[col.key][0], rangeState[col.key][1])
      )
  );

  // Data processing: sorting
  if (sortState.length > 0) {
    filteredData = [...filteredData].sort((a, b) => {
      for (const sortCol of sortState) {
        const va = a[sortCol.key];
        const vb = b[sortCol.key];
        if (typeof va === 'number' && typeof vb === 'number') {
          if (va < vb) return sortCol.dir === 'asc' ? -1 : 1;
          if (va > vb) return sortCol.dir === 'asc' ? 1 : -1;
        } else {
          if (String(va) < String(vb)) return sortCol.dir === 'asc' ? -1 : 1;
          if (String(va) > String(vb)) return sortCol.dir === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
  }

  // Get ordered and visible columns
  const orderedColumns = columnOrder
    .map((key) => appColumns.find((col) => col.key === key))
    .filter((col): col is NonNullable<typeof col> => Boolean(col))
    .filter((col) => visibleColumns.has(col.key));

  // Convert to TanStack columns
  const tanStackColumns = convertToTanStackColumns(orderedColumns);

  // Open drawer handler
  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    if (isPinned) {
      setIsPinned(false);
    }
  };

  const handlePinChange = (pinned: boolean) => {
    setIsPinned(pinned);
  };

  const table = useReactTable({
    columnResizeMode: 'onChange',
    columns: tanStackColumns,
    data: filteredData,
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

      <TableSettingsDrawer
        columnOrder={columnOrder}
        columns={appColumns}
        data={rawData}
        filterState={filterState}
        isPinned={isPinned}
        open={drawerOpen || isPinned}
        rangeState={rangeState}
        setColumnOrder={setColumnOrder}
        setFilterState={setFilterState}
        setRangeState={setRangeState}
        setSortState={setSortState}
        setTab={setDrawerTab}
        setVisibleColumns={setVisibleColumns}
        sortState={sortState}
        tab={drawerTab}
        visibleColumns={visibleColumns}
        onClose={handleCloseDrawer}
        onPinChange={handlePinChange}
      />
    </section>
  );
};

export default Table;

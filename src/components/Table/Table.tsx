import { useEffect, useState } from 'react';
import * as stylex from '@stylexjs/stylex';

import { MainHeader } from '../MainHeader';
import type { DataRecord } from '../sections/FiltersSection/FiltersSection.types';
import type { TSortCol } from '../sections/SortBySection/SortBySection.types';
import { SettingsButton } from '../SettingsButton';
import { TableSettingsDrawer } from '../TableSettingsDrawer';

import type { TPinnedColumns } from './components/CustomTable';
import { CustomTable } from './components/CustomTable';
import { styles } from './Table.stylex';
import type { TEnhancedTableProps } from './Table.types';

const Table = ({
  columns: appColumns,
  data: rawData,
  showHeader = true,
  tableId = 'default',
}: TEnhancedTableProps) => {
  // Generate unique localStorage key for this table instance
  const LOCAL_STORAGE_KEY = `vibe-table-settings-${tableId}`;

  // Table settings state
  const [columnOrder, setColumnOrder] = useState<string[]>(
    appColumns.map((col) => col.key)
  );
  const [pinnedColumns, setPinnedColumns] = useState<TPinnedColumns>({
    left: [],
    right: [],
  });
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(appColumns.map((col) => col.key))
  );
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

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

  // Pending states (for settings drawer - only applied when user clicks Apply)
  const [pendingColumnOrder, setPendingColumnOrder] = useState<string[]>(
    appColumns.map((col) => col.key)
  );
  const [pendingPinnedColumns, setPendingPinnedColumns] =
    useState<TPinnedColumns>({
      left: [],
      right: [],
    });
  const [pendingVisibleColumns, setPendingVisibleColumns] = useState<
    Set<string>
  >(new Set(appColumns.map((col) => col.key)));
  const [pendingFilterState, setPendingFilterState] = useState<
    Record<string, string[]>
  >({});
  const [pendingRangeState, setPendingRangeState] = useState<
    Record<string, [number | '', number | '']>
  >({});
  const [pendingSortState, setPendingSortState] = useState<TSortCol[]>([]);

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.columnOrder) setColumnOrder(parsed.columnOrder);
        if (parsed.pinnedColumns) setPinnedColumns(parsed.pinnedColumns);
        if (parsed.visibleColumns) {
          setVisibleColumns(new Set(parsed.visibleColumns));
        }
        if (parsed.columnWidths) setColumnWidths(parsed.columnWidths);
        if (parsed.isPinned !== undefined) setIsPinned(parsed.isPinned);
      } catch {
        // Ignore parse errors
      }
    }
  }, [LOCAL_STORAGE_KEY]);

  // Initialize filter options when data changes
  useEffect(() => {
    const newFilterState: Record<string, string[]> = {};
    appColumns
      .filter((col) => col.filterable)
      .forEach((col) => {
        // Initialize with empty array - no filters applied initially
        newFilterState[col.key] = [];
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
      isPinned,
      pinnedColumns,
      visibleColumns: Array.from(visibleColumns),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  }, [columnOrder, pinnedColumns, visibleColumns, isPinned, LOCAL_STORAGE_KEY]);

  // Data processing: NO real-time filtering - just show all data
  // Filtering is now handled via SQL string generation only
  let filteredData = rawData;

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

  // Apply settings handler - applies all pending changes
  const handleApplySettings = () => {
    setColumnOrder(pendingColumnOrder);
    setPinnedColumns(pendingPinnedColumns);
    setVisibleColumns(pendingVisibleColumns);
    setFilterState(pendingFilterState);
    setRangeState(pendingRangeState);
    setSortState(pendingSortState);
    setDrawerOpen(false);
  };

  // Cancel settings handler - resets pending changes to current values
  const handleCancelSettings = () => {
    setPendingColumnOrder(columnOrder);
    setPendingPinnedColumns(pinnedColumns);
    setPendingVisibleColumns(visibleColumns);
    setPendingFilterState(filterState);
    setPendingRangeState(rangeState);
    setPendingSortState(sortState);
    setDrawerOpen(false);
  };

  // Generate SQL-like filter string
  const generateSQLFilterString = () => {
    const conditions: string[] = [];

    // Add string filters
    Object.entries(pendingFilterState).forEach(([key, values]) => {
      if (values.length > 0) {
        if (values.length === 1) {
          conditions.push(`${key} = '${values[0]}'`);
        } else {
          conditions.push(
            `${key} IN (${values.map((v) => `'${v}'`).join(', ')})`
          );
        }
      }
    });

    // Add range filters
    Object.entries(pendingRangeState).forEach(([key, [min, max]]) => {
      if (min !== '' && max !== '') {
        conditions.push(`${key} BETWEEN ${min} AND ${max}`);
      } else if (min !== '') {
        conditions.push(`${key} >= ${min}`);
      } else if (max !== '') {
        conditions.push(`${key} <= ${max}`);
      }
    });

    return conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  };

  // Open drawer handler
  const handleOpenDrawer = () => {
    // Sync pending states with current states when opening drawer
    setPendingColumnOrder(columnOrder);
    setPendingPinnedColumns(pinnedColumns);
    setPendingVisibleColumns(visibleColumns);
    setPendingFilterState(filterState);
    setPendingRangeState(rangeState);
    setPendingSortState(sortState);
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

  // Handle column resizing
  const handleColumnResize = (columnKey: string, width: number) => {
    // Update local state
    setColumnWidths((prev) => ({
      ...prev,
      [columnKey]: width,
    }));

    // Persist column widths to localStorage
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const settings = saved ? JSON.parse(saved) : {};
    const columnWidths = { ...settings.columnWidths, [columnKey]: width };

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        ...settings,
        columnWidths,
      })
    );
  };
  const handleColumnPin = (
    columnKey: string,
    position: 'left' | 'none' | 'right'
  ) => {
    setPinnedColumns((prev) => {
      const newPinned = { ...prev };

      // Remove from all positions first
      newPinned.left = newPinned.left.filter((key) => key !== columnKey);
      newPinned.right = newPinned.right.filter((key) => key !== columnKey);

      // Add to new position if not 'none'
      if (position === 'left') {
        newPinned.left.push(columnKey);
      } else if (position === 'right') {
        newPinned.right.push(columnKey);
      }

      return newPinned;
    });
  };

  // Handle sort callback
  const handleSort = (newSortState: TSortCol[]) => {
    setSortState(newSortState);
  };

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

      <CustomTable
        columnOrder={columnOrder}
        columns={appColumns}
        data={filteredData}
        initialColumnWidths={columnWidths}
        pinnedColumns={pinnedColumns}
        sortState={sortState}
        visibleColumns={visibleColumns}
        onColumnPin={handleColumnPin}
        onColumnResize={handleColumnResize}
        onSort={handleSort}
      />

      <TableSettingsDrawer
        columnOrder={pendingColumnOrder}
        columns={appColumns}
        data={rawData as DataRecord[]}
        filterState={pendingFilterState}
        isPinned={isPinned}
        open={drawerOpen || isPinned}
        rangeState={pendingRangeState}
        setColumnOrder={setPendingColumnOrder}
        setFilterState={setPendingFilterState}
        setRangeState={setPendingRangeState}
        setSortState={setPendingSortState}
        setTab={setDrawerTab}
        setVisibleColumns={setPendingVisibleColumns}
        sortState={pendingSortState}
        sqlFilterString={generateSQLFilterString()}
        tab={drawerTab}
        visibleColumns={pendingVisibleColumns}
        onApply={handleApplySettings}
        onCancel={handleCancelSettings}
        onClose={handleCloseDrawer}
        onPinChange={handlePinChange}
      />
    </section>
  );
};

export default Table;

import { useCallback, useMemo, useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useVirtualizer } from '@tanstack/react-virtual';

import type { ColumnDef } from '../../../../App';
import type { TSortCol } from '../../../sections/SortBySection/SortBySection.types';

import { CustomTableBody, CustomTableHead } from './components';
import { styles } from './CustomTable.stylex.js';
import type {
  TCustomTableProps,
  TProcessedColumn,
} from './CustomTable.types.js';

const CustomTable = ({
  columnOrder,
  columns,
  data,
  onColumnPin,
  onColumnResize,
  onSort,
  pinnedColumns = { left: [], right: [] },
  sortState,
  visibleColumns,
}: TCustomTableProps) => {
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  // Process columns with ordering, visibility, and pinning
  const processedColumns: TProcessedColumn[] = useMemo(() => {
    return columnOrder
      .map((key: string) => columns.find((col: ColumnDef) => col.key === key))
      .filter((col): col is ColumnDef => Boolean(col))
      .filter((col: ColumnDef) => visibleColumns.has(col.key))
      .map((col: ColumnDef) => ({
        ...col,
        isLeftPinned: pinnedColumns.left.includes(col.key),
        isResizing: false,
        isRightPinned: pinnedColumns.right.includes(col.key),
        width: columnWidths[col.key] || (col.type === 'number' ? 120 : 200),
      }));
  }, [columns, columnOrder, visibleColumns, pinnedColumns, columnWidths]);

  // Separate columns into pinned and scrollable
  const leftPinnedColumns = processedColumns.filter((col) => col.isLeftPinned);
  const rightPinnedColumns = processedColumns.filter(
    (col) => col.isRightPinned
  );
  const scrollableColumns = processedColumns.filter(
    (col) => !col.isLeftPinned && !col.isRightPinned
  );

  // Column virtualization for scrollable columns only
  const columnVirtualizer = useVirtualizer({
    count: scrollableColumns.length,
    estimateSize: (index) => scrollableColumns[index]?.width || 200,
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 3,
  });

  // Row virtualization
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: data.length,
    estimateSize: () => 40, // Standard row height
    getScrollElement: () => tableContainerRef.current,
    overscan: 10,
  });

  // Handle column resize
  const handleColumnResize = useCallback(
    (columnKey: string, width: number) => {
      setColumnWidths((prev) => ({
        ...prev,
        [columnKey]: Math.max(50, width), // Minimum width of 50px
      }));
      onColumnResize?.(columnKey, width);
    },
    [onColumnResize]
  );

  // Handle column pinning
  const handleColumnPin = useCallback(
    (columnKey: string, position: 'left' | 'none' | 'right') => {
      onColumnPin?.(columnKey, position);
    },
    [onColumnPin]
  );

  // Handle sorting
  const handleSort = useCallback(
    (columnKey: string) => {
      const column = columns.find((col: ColumnDef) => col.key === columnKey);
      if (!column?.sortable) return;

      const currentSort = sortState.find((s: TSortCol) => s.key === columnKey);
      let newSortState: TSortCol[];

      if (!currentSort) {
        // Add new sort
        newSortState = [
          ...sortState,
          { dir: 'asc', key: columnKey, label: column.label },
        ];
      } else if (currentSort.dir === 'asc') {
        // Change to desc
        newSortState = sortState.map((s: TSortCol) =>
          s.key === columnKey ? { ...s, dir: 'desc' as const } : s
        );
      } else {
        // Remove sort
        newSortState = sortState.filter((s: TSortCol) => s.key !== columnKey);
      }

      onSort(newSortState);
    },
    [columns, sortState, onSort]
  );

  // Calculate total width of pinned columns (for future use)
  // const leftPinnedWidth = leftPinnedColumns.reduce((sum, col) => sum + col.width, 0);
  // const rightPinnedWidth = rightPinnedColumns.reduce((sum, col) => sum + col.width, 0);

  const virtualColumns = columnVirtualizer.getVirtualItems();

  // Calculate virtual padding for scrollable columns
  let virtualPaddingLeft = 0;
  let virtualPaddingRight = 0;

  if (virtualColumns.length > 0) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }

  return (
    <div
      ref={tableContainerRef}
      {...stylex.props(styles.container)}
    >
      <div {...stylex.props(styles.tableWrapper)}>
        {/* Left pinned columns */}
        {leftPinnedColumns.length > 0 && (
          <div {...stylex.props(styles.pinnedSection, styles.leftPinned)}>
            <table {...stylex.props(styles.table)}>
              <CustomTableHead
                columns={leftPinnedColumns}
                isPinned='left'
                sortState={sortState}
                onColumnPin={handleColumnPin}
                onColumnResize={handleColumnResize}
                onSort={handleSort}
              />
              <CustomTableBody
                columns={leftPinnedColumns}
                data={data}
                isPinned='left'
                rowVirtualizer={rowVirtualizer}
              />
            </table>
          </div>
        )}

        {/* Scrollable columns */}
        <div {...stylex.props(styles.scrollableSection)}>
          <table {...stylex.props(styles.table)}>
            <CustomTableHead
              columns={scrollableColumns}
              sortState={sortState}
              virtualColumns={virtualColumns}
              virtualPaddingLeft={virtualPaddingLeft}
              virtualPaddingRight={virtualPaddingRight}
              onColumnPin={handleColumnPin}
              onColumnResize={handleColumnResize}
              onSort={handleSort}
            />
            <CustomTableBody
              columns={scrollableColumns}
              data={data}
              rowVirtualizer={rowVirtualizer}
              virtualColumns={virtualColumns}
              virtualPaddingLeft={virtualPaddingLeft}
              virtualPaddingRight={virtualPaddingRight}
            />
          </table>
        </div>

        {/* Right pinned columns */}
        {rightPinnedColumns.length > 0 && (
          <div {...stylex.props(styles.pinnedSection, styles.rightPinned)}>
            <table {...stylex.props(styles.table)}>
              <CustomTableHead
                columns={rightPinnedColumns}
                isPinned='right'
                sortState={sortState}
                onColumnPin={handleColumnPin}
                onColumnResize={handleColumnResize}
                onSort={handleSort}
              />
              <CustomTableBody
                columns={rightPinnedColumns}
                data={data}
                isPinned='right'
                rowVirtualizer={rowVirtualizer}
              />
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTable;

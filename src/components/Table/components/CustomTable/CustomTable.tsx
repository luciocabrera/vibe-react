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
    const result = columnOrder
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

    return result;
  }, [columns, columnOrder, visibleColumns, pinnedColumns, columnWidths]);

  // Calculate pinned column widths and positions
  const leftPinnedWidth = useMemo(() => {
    return processedColumns
      .filter((col) => col.isLeftPinned)
      .reduce((sum, col) => sum + col.width, 0);
  }, [processedColumns]);

  const rightPinnedWidth = useMemo(() => {
    return processedColumns
      .filter((col) => col.isRightPinned)
      .reduce((sum, col) => sum + col.width, 0);
  }, [processedColumns]);

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

  return (
    <div
      ref={tableContainerRef}
      {...stylex.props(styles.container)}
    >
      <table {...stylex.props(styles.table)}>
        <CustomTableHead
          columns={processedColumns}
          leftPinnedWidth={leftPinnedWidth}
          rightPinnedWidth={rightPinnedWidth}
          sortState={sortState}
          onColumnPin={handleColumnPin}
          onColumnResize={handleColumnResize}
          onSort={handleSort}
        />
        <CustomTableBody
          columns={processedColumns}
          data={data}
          leftPinnedWidth={leftPinnedWidth}
          rightPinnedWidth={rightPinnedWidth}
          rowVirtualizer={rowVirtualizer}
        />
      </table>
    </div>
  );
};

export default CustomTable;

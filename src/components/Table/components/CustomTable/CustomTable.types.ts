import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

import type { ColumnDef } from '../../../../App';
import type { TSortCol } from '../../../sections/SortBySection/SortBySection.types';

export type TProcessedColumn = ColumnDef & {
  isLeftPinned: boolean;
  isResizing: boolean;
  isRightPinned: boolean;
  width: number;
};

export type TPinnedColumns = {
  left: string[];
  right: string[];
};

export type TCustomTableProps = {
  columnOrder: string[];
  columns: ColumnDef[];
  data: Record<string, unknown>[];
  initialColumnWidths?: Record<string, number>;
  onColumnPin?: (
    columnKey: string,
    position: 'left' | 'none' | 'right'
  ) => void;
  onColumnResize?: (columnKey: string, width: number) => void;
  onSort: (sortState: TSortCol[]) => void;
  pinnedColumns?: TPinnedColumns;
  sortState: TSortCol[];
  visibleColumns: Set<string>;
};

export type TCustomTableHeadProps = {
  columns: TProcessedColumn[];
  leftPinnedWidth: number;
  onColumnPin?: (
    columnKey: string,
    position: 'left' | 'none' | 'right'
  ) => void;
  onColumnResize: (columnKey: string, width: number) => void;
  onSort: (columnKey: string) => void;
  rightPinnedWidth: number;
  sortState: TSortCol[];
};

export type TCustomTableBodyProps = {
  columns: TProcessedColumn[];
  data: Record<string, unknown>[];
  leftPinnedWidth: number;
  rightPinnedWidth: number;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
};

export type TCustomTableHeaderCellProps = {
  column: TProcessedColumn;
  leftPinnedWidth: number;
  onColumnPin?: (
    columnKey: string,
    position: 'left' | 'none' | 'right'
  ) => void;
  onColumnResize: (columnKey: string, width: number) => void;
  onSort: (columnKey: string) => void;
  position: number | null;
  rightPinnedWidth: number;
  sortState: TSortCol[];
};

export type TCustomTableCellProps = {
  column: TProcessedColumn;
  leftPinnedWidth: number;
  position: number | null;
  rightPinnedWidth: number;
  rowData: Record<string, unknown>;
  value: unknown;
};

export type TCustomTableRowProps = {
  columns: TProcessedColumn[];
  leftPinnedWidth: number;
  rightPinnedWidth: number;
  rowData: Record<string, unknown>;
  rowIndex: number;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  virtualRow: VirtualItem;
};

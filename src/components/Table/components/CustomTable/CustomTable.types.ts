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
  data: Record<string, any>[];
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
  isPinned?: 'left' | 'right';
  onColumnPin?: (
    columnKey: string,
    position: 'left' | 'none' | 'right'
  ) => void;
  onColumnResize: (columnKey: string, width: number) => void;
  onSort: (columnKey: string) => void;
  sortState: TSortCol[];
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
};

export type TCustomTableBodyProps = {
  columns: TProcessedColumn[];
  data: Record<string, any>[];
  isPinned?: 'left' | 'right';
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
};

export type TCustomTableHeaderCellProps = {
  column: TProcessedColumn;
  isPinned?: 'left' | 'right';
  onColumnPin?: (
    columnKey: string,
    position: 'left' | 'none' | 'right'
  ) => void;
  onColumnResize: (columnKey: string, width: number) => void;
  onSort: (columnKey: string) => void;
  sortState: TSortCol[];
};

export type TCustomTableCellProps = {
  column: TProcessedColumn;
  rowData: Record<string, any>;
  value: any;
};

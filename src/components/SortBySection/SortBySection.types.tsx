import type { ColumnDef } from '../../App';

export type SortCol = {
  key: string;
  label: string;
  dir: 'asc' | 'desc';
};

export type SortBySectionProps = {
  allColumns: ColumnDef[];
  sortState: SortCol[];
  onChange: (newSort: SortCol[]) => void;
};


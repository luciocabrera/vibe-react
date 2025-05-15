import type { ColumnDef } from '../../../App';

export type TSortCol = {
  dir: 'asc' | 'desc';
  key: string;
  label: string;
};

export type TSortBySectionProps = {
  allColumns: ColumnDef[];
  onChange: (newSort: TSortCol[]) => void;
  sortState: TSortCol[];
};

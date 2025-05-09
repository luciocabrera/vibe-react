import type { ColumnDef } from '../../App';

// Generic type for the data records to avoid using 'any'
export type DataRecord = Record<
  string,
  string | number | boolean | null | undefined
>;

export type FiltersSectionProps = {
  columns: ColumnDef[];
  data: DataRecord[];
  filterState: Record<string, string[]>;
  onFilterChange: (key: string, values: string[]) => void;
  rangeState: Record<string, [number | '', number | '']>;
  onRangeChange: (key: string, min: number | '', max: number | '') => void;
  onReset: () => void;
  onResetFilter: (key: string) => void;
  onResetRange: (key: string) => void;
};


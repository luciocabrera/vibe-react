import type { ColumnDef } from '../../App';
import type { DataRecord } from '../FiltersSection/FiltersSection.types';
import type { TSortCol } from '../SortBySection/SortBySection.types';

export type TableSettingsDrawerProps = {
  columnOrder: string[];
  columns: ColumnDef[];
  data: DataRecord[];
  filterState: Record<string, string[]>;
  isPinned?: boolean;
  onClose: () => void;
  onPinChange?: (isPinned: boolean) => void;
  open: boolean;
  rangeState: Record<string, [number | '', number | '']>;
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  setFilterState: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  setRangeState: React.Dispatch<
    React.SetStateAction<Record<string, [number | '', number | '']>>
  >;
  setSortState: React.Dispatch<React.SetStateAction<TSortCol[]>>;
  setTab: (tab: 'columns' | 'filters' | 'sorting') => void;
  setVisibleColumns?: React.Dispatch<React.SetStateAction<Set<string>>>;
  sortState: TSortCol[];
  tab: 'columns' | 'filters' | 'sorting';
  visibleColumns?: Set<string>;
};

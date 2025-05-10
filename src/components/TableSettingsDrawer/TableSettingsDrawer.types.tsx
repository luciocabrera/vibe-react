import type { ColumnDef } from '../../App';
import type { SortCol } from '../SortBySection/SortBySection.types';

export type TableSettingsDrawerProps = {
  columnOrder: string[];
  columns: ColumnDef[];
  data: Record<string, any>[];
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
  setSortState: React.Dispatch<React.SetStateAction<SortCol[]>>;
  setTab: (tab: 'columns' | 'filters' | 'sorting') => void;
  setVisibleColumns?: React.Dispatch<React.SetStateAction<Set<string>>>;
  sortState: SortCol[];
  tab: 'columns' | 'filters' | 'sorting';
  visibleColumns?: Set<string>;
};


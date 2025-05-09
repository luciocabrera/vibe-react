import type { ColumnDef } from '../../App';
import type { SortCol } from '../SortBySection/SortBySection.types';

export type TableSettingsDrawerProps = {
  open: boolean;
  onClose: () => void;
  tab: 'filters' | 'sorting' | 'columns';
  setTab: (tab: 'filters' | 'sorting' | 'columns') => void;
  columns: ColumnDef[];
  data: Record<string, any>[];
  filterState: Record<string, string[]>;
  setFilterState: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  rangeState: Record<string, [number | '', number | '']>;
  setRangeState: React.Dispatch<
    React.SetStateAction<Record<string, [number | '', number | '']>>
  >;
  sortState: SortCol[];
  setSortState: React.Dispatch<React.SetStateAction<SortCol[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  visibleColumns?: Set<string>;
  setVisibleColumns?: React.Dispatch<React.SetStateAction<Set<string>>>;
  isPinned?: boolean;
  onPinChange?: (isPinned: boolean) => void;
};


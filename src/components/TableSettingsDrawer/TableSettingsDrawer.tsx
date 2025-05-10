import { ColumnOrderSection } from '../ColumnOrderSection';
import { FiltersSection } from '../FiltersSection';
import { SortBySection } from '../SortBySection';

import type { TableSettingsDrawerProps } from './TableSettingsDrawer.types';

import './TableSettingsDrawer.css';

const TableSettingsDrawer = ({
  columnOrder,
  columns,
  data,
  filterState,
  isPinned = false,
  onClose,
  onPinChange,
  open,
  rangeState,
  setColumnOrder,
  setFilterState,
  setRangeState,
  setSortState,
  setTab,
  setVisibleColumns,
  sortState,
  tab,
  visibleColumns,
}: TableSettingsDrawerProps) => {
  if (!open) return null;

  const handlePinClick = () => onPinChange?.(!isPinned);

  const handleClose = () => onClose();
  const handleBackdropKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') onClose();
  };
  const handleTabFilters = () => setTab('filters');
  const handleTabSorting = () => setTab('sorting');
  const handleTabColumns = () => setTab('columns');

  const handleFilterChange = (key: string, vals: string[]) => {
    setFilterState(fs => ({ ...fs, [key]: vals }));
  };
  const handleRangeChange = (
    key: string,
    min: number | '',
    max: number | ''
  ) => {
    setRangeState(rs => ({ ...rs, [key]: [min, max] }));
  };
  const handleResetRange = (key: string) => {
    setRangeState(rs => ({ ...rs, [key]: ['', ''] }));
  };
  const handleReset = () => {
    const newFilterState: Record<string, string[]> = {};
    columns
      .filter(col => col.filterable)
      .forEach(col => {
        const opts = Array.from(
          new Set(data.map(d => d[col.key]).filter(Boolean))
        );
        newFilterState[col.key] = opts;
      });
    setFilterState(newFilterState);
    const newRangeState: Record<string, [number | '', number | '']> = {};
    columns
      .filter(col => col.rangeFilter)
      .forEach(col => {
        newRangeState[col.key] = ['', ''];
      });
    setRangeState(newRangeState);
  };
  const handleResetFilter = (key: string) => {
    const opts = Array.from(new Set(data.map(d => d[key]).filter(Boolean)));
    setFilterState(fs => ({ ...fs, [key]: opts }));
  };
  const handleSortChange = (newSort: any) => setSortState(newSort);

  return (
    <>
      {!isPinned && (
        <div
          aria-label='Close settings panel'
          className='drawer-backdrop'
          role='button'
          tabIndex={0}
          onClick={handleClose}
          onKeyDown={handleBackdropKeyDown}
        />
      )}
      <aside className={`drawer${isPinned ? ' pinned' : ''}`}>
        <div className='drawer-header'>
          <span style={{ fontSize: '1.2em', fontWeight: 600 }}>
            Table Settings
          </span>
          <div>
            <button
              className='drawer-pin-btn'
              title={isPinned ? 'Unpin drawer' : 'Pin drawer'}
              onClick={handlePinClick}
            >
              {isPinned ? '📌' : '📍'}
            </button>
            <button
              className='drawer-close-btn'
              title='Close'
              onClick={handleClose}
            >
              ×
            </button>
          </div>
        </div>
        <div className='drawer-tabs'>
          <button
            className={`drawer-tab${tab === 'filters' ? ' active' : ''}`}
            onClick={handleTabFilters}
          >
            Filters
          </button>
          <button
            className={`drawer-tab${tab === 'sorting' ? ' active' : ''}`}
            onClick={handleTabSorting}
          >
            Sorting
          </button>
          <button
            className={`drawer-tab${tab === 'columns' ? ' active' : ''}`}
            onClick={handleTabColumns}
          >
            Columns
          </button>
        </div>
        <div className='drawer-content'>
          {tab === 'filters' ? (
            <FiltersSection
              columns={columns}
              data={data}
              filterState={filterState}
              rangeState={rangeState}
              onFilterChange={handleFilterChange}
              onRangeChange={handleRangeChange}
              onReset={handleReset}
              onResetFilter={handleResetFilter}
              onResetRange={handleResetRange}
            />
          ) : tab === 'sorting' ? (
            <SortBySection
              allColumns={columns}
              sortState={sortState}
              onChange={handleSortChange}
            />
          ) : (
            <ColumnOrderSection
              columnOrder={columnOrder}
              columns={columns}
              setColumnOrder={setColumnOrder}
              setVisibleColumns={setVisibleColumns}
              visibleColumns={visibleColumns}
            />
          )}
        </div>
      </aside>
    </>
  );
};

export default TableSettingsDrawer;


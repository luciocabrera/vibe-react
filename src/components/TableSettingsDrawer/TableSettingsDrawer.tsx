import { SortBySection } from '../SortBySection';

import './TableSettingsDrawer.css';
import { ColumnOrderSection } from '../ColumnOrderSection';
import type { TableSettingsDrawerProps } from './TableSettingsDrawer.types';
import { FiltersSection } from '../FiltersSection';

const TableSettingsDrawer = ({
  open,
  onClose,
  tab,
  setTab,
  columns,
  data,
  filterState,
  setFilterState,
  rangeState,
  setRangeState,
  sortState,
  setSortState,
  columnOrder,
  setColumnOrder,
  visibleColumns,
  setVisibleColumns,
  isPinned = false,
  onPinChange,
}: TableSettingsDrawerProps) => {
  if (!open) return null;

  const handlePinClick = () => {
    if (onPinChange) {
      onPinChange(!isPinned);
    }
  };

  return (
    <>
      {!isPinned && (
        <div
          className='drawer-backdrop'
          role='button'
          tabIndex={0}
          aria-label='Close settings panel'
          onClick={onClose}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClose()}
        />
      )}
      <aside className={`drawer${isPinned ? ' pinned' : ''}`}>
        <div className='drawer-header'>
          <span style={{ fontWeight: 600, fontSize: '1.2em' }}>
            Table Settings
          </span>
          <div>
            <button
              className='drawer-pin-btn'
              onClick={handlePinClick}
              title={isPinned ? 'Unpin drawer' : 'Pin drawer'}
            >
              {isPinned ? '📌' : '📍'}
            </button>
            <button
              className='drawer-close-btn'
              onClick={onClose}
              title='Close'
            >
              ×
            </button>
          </div>
        </div>
        <div className='drawer-tabs'>
          <button
            className={`drawer-tab${tab === 'filters' ? ' active' : ''}`}
            onClick={() => setTab('filters')}
          >
            Filters
          </button>
          <button
            className={`drawer-tab${tab === 'sorting' ? ' active' : ''}`}
            onClick={() => setTab('sorting')}
          >
            Sorting
          </button>
          <button
            className={`drawer-tab${tab === 'columns' ? ' active' : ''}`}
            onClick={() => setTab('columns')}
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
              onFilterChange={(key, vals) =>
                setFilterState(fs => ({ ...fs, [key]: vals }))
              }
              rangeState={rangeState}
              onRangeChange={(key, min, max) =>
                setRangeState(rs => ({ ...rs, [key]: [min, max] }))
              }
              onReset={() => {
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
                const newRangeState: Record<
                  string,
                  [number | '', number | '']
                > = {};
                columns
                  .filter(col => col.rangeFilter)
                  .forEach(col => {
                    newRangeState[col.key] = ['', ''];
                  });
                setRangeState(newRangeState);
              }}
              onResetFilter={key => {
                const opts = Array.from(
                  new Set(data.map(d => d[key]).filter(Boolean))
                );
                setFilterState(fs => ({ ...fs, [key]: opts }));
              }}
              onResetRange={key =>
                setRangeState(rs => ({ ...rs, [key]: ['', ''] }))
              }
            />
          ) : tab === 'sorting' ? (
            <SortBySection
              allColumns={columns}
              sortState={sortState}
              onChange={setSortState}
            />
          ) : (
            <ColumnOrderSection
              columns={columns}
              columnOrder={columnOrder}
              setColumnOrder={setColumnOrder}
              visibleColumns={visibleColumns}
              setVisibleColumns={setVisibleColumns}
            />
          )}
        </div>
      </aside>
    </>
  );
};

export default TableSettingsDrawer;


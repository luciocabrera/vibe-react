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

  const handlePinClick = () => {
    if (onPinChange) {
      onPinChange(!isPinned);
    }
  };

  return (
    <>
      {!isPinned && (
        <div
          aria-label='Close settings panel'
          className='drawer-backdrop'
          role='button'
          tabIndex={0}
          onClick={onClose}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClose()}
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
              onClick={onClose}
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
              rangeState={rangeState}
              onFilterChange={(key, vals) =>
                setFilterState(fs => ({ ...fs, [key]: vals }))
              }
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


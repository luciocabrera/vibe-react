import React from 'react';
import { FiltersSection } from './FiltersSection';
import { SortBySection } from './SortBySection';
import { ColumnOrderSection } from './ColumnOrderSection';
import type { ColumnDef } from '../App';
import type { SortCol } from './SortBySection';

interface TableSettingsDrawerProps {
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
}

export const TableSettingsDrawer: React.FC<TableSettingsDrawerProps> = ({
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
}) => {
  if (!open) return null;
  return (
    <>
      <div
        className='drawer-backdrop'
        role='button'
        tabIndex={0}
        aria-label='Close settings panel'
        onClick={onClose}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClose()}
      />
      <aside className='drawer'>
        <div className='drawer-header'>
          <span style={{ fontWeight: 600, fontSize: '1.2em' }}>
            Table Settings
          </span>
          <button className='drawer-close-btn' onClick={onClose} title='Close'>
            ×
          </button>
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
            />
          )}
        </div>
      </aside>
    </>
  );
};


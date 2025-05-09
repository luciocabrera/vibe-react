import { useEffect, useState } from 'react';

import { ResultsTable } from './components/ResultsTable';
import { TableSettingsDrawer } from './components/TableSettingsDrawer';
import { FiltersSection } from './components/FiltersSection';
import { SortBySection } from './components/SortBySection';
import type { SortCol } from './components/SortBySection/SortBySection.types';
// Dummy data loader (replace with real file input logic as needed)
const initialData: Record<string, any>[] = [];

// Define a dynamic schema for columns
export type ColumnDef = {
  key: string;
  label: string;
  type: 'string' | 'number';
  filterable?: boolean;
  sortable?: boolean;
  rangeFilter?: boolean;
};

const columns: ColumnDef[] = [
  {
    key: 'fileName',
    label: 'File Name',
    type: 'string',
    filterable: true,
    sortable: true,
  },
  {
    key: 'url',
    label: 'URL',
    type: 'string',
    filterable: true,
    sortable: true,
  },
  {
    key: 'method',
    label: 'Method',
    type: 'string',
    filterable: true,
    sortable: true,
  },
  {
    key: 'num_requests',
    label: 'num_requests',
    type: 'number',
    filterable: false,
    sortable: true,
  },
  {
    key: 'concurrency',
    label: 'concurrency',
    type: 'number',
    filterable: false,
    sortable: true,
  },
  {
    key: 'avgTime',
    label: 'Avg Time (ms)',
    type: 'number',
    filterable: false,
    sortable: true,
    rangeFilter: true,
  },
  {
    key: 'minTime',
    label: 'Min Time (ms)',
    type: 'number',
    filterable: false,
    sortable: true,
    rangeFilter: true,
  },
  {
    key: 'maxTime',
    label: 'Max Time (ms)',
    type: 'number',
    filterable: false,
    sortable: true,
    rangeFilter: true,
  },
  {
    key: 'avgSize',
    label: 'Avg Size (bytes)',
    type: 'number',
    filterable: false,
    sortable: true,
    rangeFilter: true,
  },
];

const App: React.FC = () => {
  // State for all data (replace with file upload logic)
  const [data, setData] = useState<Record<string, any>[]>(initialData);
  // Dynamic filter and range state
  const [filterState, setFilterState] = useState<Record<string, string[]>>({});
  const [rangeState, setRangeState] = useState<
    Record<string, [number | '', number | '']>
  >({});
  // Grouping
  const [groupByUrl, setGroupByUrl] = useState(false);
  const [groupByMethod, setGroupByMethod] = useState(false);
  // Sorting
  const [sortState, setSortState] = useState<SortCol[]>([]);
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'filters' | 'sorting' | 'columns'>(
    'filters'
  );
  // Drawer pin state
  const [isPinned, setIsPinned] = useState(false);

  // On data load/update, update filter options
  useEffect(() => {
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
    // Reset range state for new data
    const newRangeState: Record<string, [number | '', number | '']> = {};
    columns
      .filter(col => col.rangeFilter)
      .forEach(col => {
        newRangeState[col.key] = ['', ''];
      });
    setRangeState(newRangeState);
  }, [data]);

  // Filtering logic
  let filtered = data.filter(row =>
    columns
      .filter(col => col.filterable)
      .every(
        col =>
          filterState[col.key]?.length === 0 ||
          filterState[col.key]?.includes(row[col.key])
      )
  );
  function inRange(val: number | '-', min: number | '', max: number | '') {
    if (val === '-' || isNaN(Number(val))) return false;
    if (min !== '' && Number(val) < min) return false;
    if (max !== '' && Number(val) > max) return false;
    return true;
  }
  filtered = filtered.filter(row =>
    columns
      .filter(col => col.rangeFilter)
      .every(col =>
        inRange(
          row[col.key],
          rangeState[col.key]?.[0],
          rangeState[col.key]?.[1]
        )
      )
  );

  // Sorting logic
  if (sortState.length > 0) {
    filtered = [...filtered].sort((a, b) => {
      for (const sortCol of sortState) {
        const va = a[sortCol.key as keyof Record<string, any>];
        const vb = b[sortCol.key as keyof Record<string, any>];
        if (typeof va === 'number' && typeof vb === 'number') {
          if (va < vb) return sortCol.dir === 'asc' ? -1 : 1;
          if (va > vb) return sortCol.dir === 'asc' ? 1 : -1;
        } else {
          if (String(va) < String(vb)) return sortCol.dir === 'asc' ? -1 : 1;
          if (String(va) > String(vb)) return sortCol.dir === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
  }

  // File upload handler (for demo, not production)
  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const promises = Array.from(files).map(file =>
      file.text().then(text => {
        try {
          const data = JSON.parse(text);
          let metadata, results;
          if (Array.isArray(data)) {
            results = data;
            metadata = {};
          } else {
            metadata = data.metadata ?? {};
            results = data.results ?? [];
          }
          const successes = results.filter(
            (r: Record<string, any>) =>
              r.status === 200 && typeof r.time_ms === 'number'
          );
          const sizes = successes
            .map((r: Record<string, any>) => r.size_bytes)
            .filter((x: any) => typeof x === 'number');
          const times = successes
            .map((r: Record<string, any>) => r.time_ms)
            .filter((x: any) => typeof x === 'number');
          const avgTime = times.length
            ? times.reduce((a: number, b: number) => a + b, 0) / times.length
            : '-';
          const minTime = times.length ? Math.min(...times) : '-';
          const maxTime = times.length ? Math.max(...times) : '-';
          const avgSize = sizes.length
            ? sizes.reduce((a: number, b: number) => a + b, 0) / sizes.length
            : '-';
          return {
            fileName: file.name,
            url: metadata.url ?? '-',
            method: metadata.method ?? '-',
            num_requests: metadata.num_requests ?? '-',
            concurrency: metadata.concurrency ?? '-',
            avgTime,
            minTime,
            maxTime,
            avgSize,
          } as Record<string, any>;
        } catch {
          return null;
        }
      })
    );
    Promise.all(promises).then(rows => {
      setData(rows.filter(Boolean) as Record<string, any>[]);
    });
  }

  // Column order state and drag-and-drop logic
  const [columnOrder, setColumnOrder] = useState(columns.map(col => col.key));
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map(col => col.key))
  );

  const orderedColumns = columnOrder
    .map(key => columns.find(col => col.key === key)!)
    .filter(Boolean)
    .filter(col => visibleColumns.has(col.key)); // Filter by visibility

  return (
    <div
      className={isPinned ? 'with-pinned-drawer' : ''}
      style={
        isPinned ? undefined : { maxWidth: 1200, margin: '0 auto', padding: 24 }
      }
    >
      {isPinned ? (
        // Main content when drawer is pinned
        <div className='main-content'>
          <h1>API Benchmark Multi-Results Viewer (React)</h1>
          <div style={{ marginBottom: 18 }}>
            <label>
              <b>Select multiple results JSON files:</b>
              <input
                type='file'
                accept='application/json'
                multiple
                onChange={handleFileInput}
                style={{ marginLeft: 12 }}
              />
            </label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>
              <input
                type='checkbox'
                checked={groupByUrl}
                onChange={e => setGroupByUrl(e.target.checked)}
              />{' '}
              Group by URL
            </label>
            <label style={{ marginLeft: 16 }}>
              <input
                type='checkbox'
                checked={groupByMethod}
                onChange={e => setGroupByMethod(e.target.checked)}
              />{' '}
              Group by Method
            </label>
          </div>
          <ResultsTable
            data={filtered}
            columns={orderedColumns}
            groupByUrl={groupByUrl}
            groupByMethod={groupByMethod}
          />
        </div>
      ) : (
        // Original layout when drawer is not pinned
        <>
          <button
            className='settings-btn'
            onClick={() => setDrawerOpen(true)}
            title='Table Settings'
            aria-label='Table Settings'
          >
            <img
              src='/vite.svg'
              alt='settings'
              style={{ width: 28, height: 28 }}
            />
          </button>
          <h1>API Benchmark Multi-Results Viewer (React)</h1>
          <div style={{ marginBottom: 18 }}>
            <label>
              <b>Select multiple results JSON files:</b>
              <input
                type='file'
                accept='application/json'
                multiple
                onChange={handleFileInput}
                style={{ marginLeft: 12 }}
              />
            </label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>
              <input
                type='checkbox'
                checked={groupByUrl}
                onChange={e => setGroupByUrl(e.target.checked)}
              />{' '}
              Group by URL
            </label>
            <label style={{ marginLeft: 16 }}>
              <input
                type='checkbox'
                checked={groupByMethod}
                onChange={e => setGroupByMethod(e.target.checked)}
              />{' '}
              Group by Method
            </label>
          </div>
          {/* Hide inline filters/sorting when drawer is open */}
          {!drawerOpen && (
            <>
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
              <SortBySection
                allColumns={columns}
                sortState={sortState}
                onChange={setSortState}
              />
            </>
          )}
          <ResultsTable
            data={filtered}
            columns={orderedColumns}
            groupByUrl={groupByUrl}
            groupByMethod={groupByMethod}
          />
        </>
      )}
      <TableSettingsDrawer
        open={drawerOpen || isPinned}
        onClose={() => {
          setDrawerOpen(false);
          if (isPinned) {
            setIsPinned(false);
          }
        }}
        tab={drawerTab}
        setTab={setDrawerTab}
        columns={columns}
        data={data}
        filterState={filterState}
        setFilterState={setFilterState}
        rangeState={rangeState}
        setRangeState={setRangeState}
        sortState={sortState}
        setSortState={setSortState}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        isPinned={isPinned}
        onPinChange={setIsPinned}
      />
    </div>
  );
};

export default App;


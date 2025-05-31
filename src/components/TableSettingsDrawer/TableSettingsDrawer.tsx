import { Drawer } from '../Drawer';
import { ColumnOrderSection } from '../sections/ColumnOrderSection';
import { FiltersSection } from '../sections/FiltersSection';
import { SortBySection } from '../sections/SortBySection';
import { Tabs } from '../Tabs';
import type { TTabsItems } from '../Tabs/Tabs.types';

import type { TableSettingsDrawerProps } from './TableSettingsDrawer.types';

const TableSettingsDrawer = ({
  columnOrder,
  columns,
  data,
  filterState,
  isPinned = false,
  onApply,
  onCancel,
  onClose,
  onPinChange,
  open,
  rangeState,
  setColumnOrder,
  setFilterState,
  setRangeState,
  setSortState,
  setVisibleColumns,
  sortState,
  sqlFilterString = '',
  visibleColumns,
}: TableSettingsDrawerProps) => {
  if (!open) return null;

  const handleClose = () => onClose();
  const handlePinChange = (isPinned: boolean) => onPinChange?.(isPinned);
  const handleApply = () => onApply?.();
  const handleCancel = () => onCancel?.();

  const handleFilterChange = (key: string, vals: string[]) => {
    setFilterState((fs) => ({ ...fs, [key]: vals }));
  };
  const handleRangeChange = (
    key: string,
    min: number | '',
    max: number | ''
  ) => {
    setRangeState((rs) => ({ ...rs, [key]: [min, max] }));
  };
  const handleResetRange = (key: string) => {
    setRangeState((rs) => ({ ...rs, [key]: ['', ''] }));
  };

  const handleReset = () => {
    const newFilterState: Record<string, string[]> = {};
    for (const col of columns.filter((col) => col.filterable)) {
      const opts = Array.from(
        new Set(data.map((d) => d[col.key]).filter(Boolean))
      ).map(String);
      newFilterState[col.key] = opts;
    }
    setFilterState(newFilterState);
    const newRangeState: Record<string, [number | '', number | '']> = {};
    for (const col of columns.filter((col) => col.rangeFilter)) {
      newRangeState[col.key] = ['', ''];
    }
  };
  const handleResetFilter = (key: string) => {
    const opts = Array.from(
      new Set(data.map((d) => d[key]).filter(Boolean))
    ).map(String);
    setFilterState((fs) => ({ ...fs, [key]: opts }));
  };
  const handleSortChange = (newSort: typeof sortState) => setSortState(newSort);

  const tabs: TTabsItems = [
    {
      children: (
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
      ),
      header: (
        <>
          {/* <FaColumns /> */}
          Filters
        </>
      ),
      key: 'tableFilters',
    },
    {
      children: (
        <SortBySection
          allColumns={columns}
          sortState={sortState}
          onChange={handleSortChange}
        />
      ),
      header: (
        <>
          {/* <SiDatabricks /> */}
          Sorting
        </>
      ),
      key: 'tableSorting',
    },
    {
      children: (
        <ColumnOrderSection
          columnOrder={columnOrder}
          columns={columns}
          setColumnOrder={setColumnOrder}
          setVisibleColumns={setVisibleColumns}
          visibleColumns={visibleColumns}
        />
      ),
      header: (
        <>
          {/* <SiDatabricks /> */}
          Columns
        </>
      ),
      key: 'columns',
    },
  ];

  return (
    <Drawer
      isPinned={isPinned}
      open={open}
      onClose={handleClose}
      onPinChange={handlePinChange}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* SQL Filter Preview */}
        {sqlFilterString && (
          <div
            style={{
              backgroundColor: '#f8f9fa',
              borderBottom: '1px solid #e9ecef',
              color: '#495057',
              fontFamily: 'monospace',
              fontSize: '12px',
              padding: '16px',
            }}
          >
            <strong>SQL Preview:</strong>
            <br />
            <code>{sqlFilterString}</code>
          </div>
        )}

        {/* Tabs Content */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Tabs tabs={tabs} />
        </div>

        {/* Apply/Cancel Buttons */}
        <div
          style={{
            borderTop: '1px solid #e9ecef',
            display: 'flex',
            gap: '8px',
            justifyContent: 'flex-end',
            padding: '16px',
          }}
        >
          <button
            style={{
              backgroundColor: '#6c757d',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
              padding: '8px 16px',
            }}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            style={{
              backgroundColor: '#007bff',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
              padding: '8px 16px',
            }}
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default TableSettingsDrawer;

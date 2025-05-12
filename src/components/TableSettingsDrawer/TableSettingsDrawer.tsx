import { ColumnOrderSection } from '../ColumnOrderSection';
import { Drawer } from '../Drawer';
import { FiltersSection } from '../FiltersSection';
import { SortBySection } from '../SortBySection';
import { Tabs } from '../Tabs';
import type { TTabsItems } from '../Tabs/Tabs.types';

import type { TableSettingsDrawerProps } from './TableSettingsDrawer.types';

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
  setVisibleColumns,
  sortState,
  visibleColumns,
}: TableSettingsDrawerProps) => {
  if (!open) return null;

  const handleClose = () => onClose();
  const handlePinChange = (isPinned: boolean) => onPinChange?.(isPinned);

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
    columns
      .filter((col) => col.filterable)
      .forEach((col) => {
        const opts = Array.from(
          new Set(data.map((d) => d[col.key]).filter(Boolean))
        ).map(String);
        newFilterState[col.key] = opts;
      });
    setFilterState(newFilterState);
    const newRangeState: Record<string, [number | '', number | '']> = {};
    columns
      .filter((col) => col.rangeFilter)
      .forEach((col) => {
        newRangeState[col.key] = ['', ''];
      });
    setRangeState(newRangeState);
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
      open={false}
      onClose={handleClose}
      onPinChange={handlePinChange}
    >
      <Tabs tabs={tabs} />
    </Drawer>
  );
};

export default TableSettingsDrawer;

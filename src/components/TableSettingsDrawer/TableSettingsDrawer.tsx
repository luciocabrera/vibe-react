import * as stylex from "@stylexjs/stylex";

import { ColumnOrderSection } from "../ColumnOrderSection";
import { Drawer } from "../Drawer";
import { FiltersSection } from "../FiltersSection";
import { SortBySection } from "../SortBySection";

import { styles } from "./TableSettingsDrawer.stylex";
import type { TableSettingsDrawerProps } from "./TableSettingsDrawer.types";

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

  const handleClose = () => onClose();
  const handlePinChange = (isPinned: boolean) => onPinChange?.(isPinned);

  const handleTabFilters = () => setTab("filters");
  const handleTabSorting = () => setTab("sorting");
  const handleTabColumns = () => setTab("columns");

  const handleFilterChange = (key: string, vals: string[]) => {
    setFilterState((fs) => ({ ...fs, [key]: vals }));
  };
  const handleRangeChange = (
    key: string,
    min: number | "",
    max: number | ""
  ) => {
    setRangeState((rs) => ({ ...rs, [key]: [min, max] }));
  };
  const handleResetRange = (key: string) => {
    setRangeState((rs) => ({ ...rs, [key]: ["", ""] }));
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
    const newRangeState: Record<string, [number | "", number | ""]> = {};
    columns
      .filter((col) => col.rangeFilter)
      .forEach((col) => {
        newRangeState[col.key] = ["", ""];
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

  return (
    <Drawer
      isPinned={isPinned}
      open={false}
      onClose={handleClose}
      onPinChange={handlePinChange}
    >
      <div {...stylex.props(styles.tabs)}>
        <button
          {...stylex.props(styles.tab, tab === "filters" && styles.tabActive)}
          onClick={handleTabFilters}
        >
          Filters
        </button>
        <button
          {...stylex.props(styles.tab, tab === "sorting" && styles.tabActive)}
          onClick={handleTabSorting}
        >
          Sorting
        </button>
        <button
          {...stylex.props(styles.tab, tab === "columns" && styles.tabActive)}
          onClick={handleTabColumns}
        >
          Columns
        </button>
      </div>
      <div {...stylex.props(styles.content)}>
        {tab === "filters" ? (
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
        ) : tab === "sorting" ? (
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
    </Drawer>
  );
};

export default TableSettingsDrawer;

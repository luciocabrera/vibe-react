import { Fragment } from 'react';

import { Badges } from '../Badges';
import { MultiSelectDropdown } from '../MultiSelectDropdown';
import { RangeInput } from '../RangeInput';

import type { FiltersSectionProps } from './FiltersSection.types';

export const FiltersSection = ({
  columns,
  data,
  filterState,
  onFilterChange,
  onRangeChange,
  onReset: handleResetAll,
  onResetFilter,
  onResetRange,
  rangeState,
}: FiltersSectionProps) => {
  const handleFilterChange = (key: string, vals: string[]) => {
    onFilterChange(key, vals);
  };
  const handleRemoveBadge = (colKey: string, val: string) => {
    onFilterChange(
      colKey,
      filterState[colKey].filter(v => v !== val)
    );
  };
  const handleRangeChange = (
    key: string,
    min: number | '',
    max: number | ''
  ) => {
    onRangeChange(key, min, max);
  };
  const handleResetRange = (key: string) => {
    onResetRange(key);
  };
  const handleResetFilter = (key: string) => {
    onResetFilter(key);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      {columns
        .filter(col => col.filterable)
        .map(col => {
          const options = Array.from(
            new Set(data.map(row => String(row[col.key])).filter(Boolean))
          );
          return (
            <Fragment key={col.key}>
              <MultiSelectDropdown
                label={col.label}
                options={options}
                selected={filterState[col.key]}
                onChange={vals => handleFilterChange(col.key, vals)}
                onReset={() => handleResetFilter(col.key)}
              />
              <div style={{ marginBottom: 12, marginTop: 4 }}>
                <Badges
                  options={options}
                  selected={filterState[col.key]}
                  onRemove={val => handleRemoveBadge(col.key, val)}
                />
              </div>
            </Fragment>
          );
        })}
      <button
        style={{ marginLeft: 12, padding: '6px 16px' }}
        type='button'
        onClick={handleResetAll}
      >
        Reset All Filters
      </button>
      <div style={{ marginTop: 10 }}>
        {columns
          .filter(col => col.rangeFilter)
          .map(col => (
            <RangeInput
              key={col.key}
              label={col.label}
              value={rangeState[col.key]}
              onChange={(min, max) => handleRangeChange(col.key, min, max)}
              onReset={() => handleResetRange(col.key)}
            />
          ))}
      </div>
    </div>
  );
};

export default FiltersSection;


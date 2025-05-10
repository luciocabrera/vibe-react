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
  onReset,
  onResetFilter,
  onResetRange,
  rangeState,
}: FiltersSectionProps) => (
  <div style={{ marginBottom: 16 }}>
    {columns
      .filter(col => col.filterable)
      .map(col => {
        const options = Array.from(
          new Set((data || []).map(row => String(row[col.key])).filter(Boolean))
        );
        return (
          <Fragment key={col.key}>
            <MultiSelectDropdown
              label={col.label}
              options={options}
              selected={filterState[col.key] || []}
              onChange={vals => onFilterChange(col.key, vals)}
              onReset={() => onResetFilter(col.key)}
            />
            <div style={{ marginBottom: 12, marginTop: 4 }}>
              <Badges
                options={options}
                selected={filterState[col.key] || []}
                onRemove={val =>
                  onFilterChange(
                    col.key,
                    (filterState[col.key] || []).filter(v => v !== val)
                  )
                }
              />
            </div>
          </Fragment>
        );
      })}
    <button
      style={{ marginLeft: 12, padding: '6px 16px' }}
      type='button'
      onClick={onReset}
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
            value={rangeState[col.key] || ['', '']}
            onChange={(min, max) => onRangeChange(col.key, min, max)}
            onReset={() => onResetRange(col.key)}
          />
        ))}
    </div>
  </div>
);

export default FiltersSection;


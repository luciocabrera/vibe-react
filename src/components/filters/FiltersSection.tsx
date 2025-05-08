import React from 'react';
import type { ColumnDef } from '../../App';
import Badges from './Badges';
import MultiSelectDropdown from './MultiSelectDropdown';
import RangeInput from './RangeInput';

// Generic type for the data records to avoid using 'any'
export type DataRecord = Record<string, string | number | boolean | null | undefined>;

export interface FiltersSectionProps {
  columns: ColumnDef[];
  data: DataRecord[];
  filterState: Record<string, string[]>;
  onFilterChange: (key: string, values: string[]) => void;
  rangeState: Record<string, [number | '', number | '']>;
  onRangeChange: (key: string, min: number | '', max: number | '') => void;
  onReset: () => void;
  onResetFilter: (key: string) => void;
  onResetRange: (key: string) => void;
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  columns,
  data,
  filterState,
  onFilterChange,
  rangeState,
  onRangeChange,
  onReset,
  onResetFilter,
  onResetRange,
}) => (
  <div style={{ marginBottom: 16 }}>
    {columns
      .filter(col => col.filterable)
      .map(col => {
        const options = Array.from(
          new Set((data || [])
            .map(row => String(row[col.key]))
            .filter(Boolean))
        );
        return (
          <React.Fragment key={col.key}>
            <MultiSelectDropdown
              label={col.label}
              options={options}
              selected={filterState[col.key] || []}
              onChange={vals => onFilterChange(col.key, vals)}
              onReset={() => onResetFilter(col.key)}
            />
            <div style={{ marginTop: 4, marginBottom: 12 }}>
              <Badges
                selected={filterState[col.key] || []}
                options={options}
                onRemove={val =>
                  onFilterChange(
                    col.key,
                    (filterState[col.key] || []).filter(v => v !== val)
                  )
                }
              />
            </div>
          </React.Fragment>
        );
      })}
    <button
      type='button'
      onClick={onReset}
      style={{ marginLeft: 12, padding: '6px 16px' }}
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

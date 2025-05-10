import * as stylex from '@stylexjs/stylex';

import { Badges } from '../Badges';
import { Button } from '../Button';
import { FormFieldBase } from '../FormFieldBase';
import { MultiSelectDropdown } from '../MultiSelectDropdown';
import { RangeInput } from '../RangeInput';

import { styles } from './FiltersSection.stylex';
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
    <div {...stylex.props(styles.container)}>
      {columns
        .filter(col => col.filterable)
        .map(col => {
          const options = Array.from(
            new Set(data.map(row => String(row[col.key])).filter(Boolean))
          );
          return (
            <FormFieldBase key={col.key} accessor={col.key} label={col.label}>
              <MultiSelectDropdown
                label={col.label}
                options={options}
                selected={filterState[col.key]}
                onChange={vals => handleFilterChange(col.key, vals)}
                onReset={() => handleResetFilter(col.key)}
              />
              <Badges
                options={options}
                selected={filterState[col.key]}
                onRemove={val => handleRemoveBadge(col.key, val)}
              />
            </FormFieldBase>
          );
        })}

      <div {...stylex.props(styles.filtersContainer)}>
        {columns
          .filter(col => col.rangeFilter)
          .map(col => (
            <FormFieldBase key={col.key} accessor={col.key} label={col.label}>
              <RangeInput
                label={col.label}
                value={rangeState[col.key]}
                onChange={(min, max) => handleRangeChange(col.key, min, max)}
                onReset={() => handleResetRange(col.key)}
              />
            </FormFieldBase>
          ))}
      </div>
      <Button size={'lg'} onClick={handleResetAll}>
        Reset All Filters
      </Button>
    </div>
  );
};

export default FiltersSection;


import { useMemo, useRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useVirtualizer } from '@tanstack/react-virtual';

import { RadioCheckInput } from '@/components/RadioCheckInput';

import { styles } from './MultiSelectDropdownListBody.stylex';
import type { TMultiSelectDropdownListBodyProps } from './MultiSelectDropdownListBody.types';

const ROW_HEIGHT = 32;

const MultiSelectDropdownListBody = ({
  instanceId,
  onChange,
  options = [],
  search,
  selected = [],
}: TMultiSelectDropdownListBodyProps) => {
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Filtered options (memoized for performance)
  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const lower = search.toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(lower));
  }, [options, search]);

  // Virtualizer setup (for filtered options only, not "Select All")
  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    estimateSize: () => ROW_HEIGHT,
    getScrollElement: () => dropdownRef.current,
    overscan: 5,
  });

  // Calculate if all filtered options are selected
  const allFilteredSelected =
    filteredOptions.length > 0 &&
    filteredOptions.every((opt) => selected.includes(opt));
  const someFilteredSelected =
    filteredOptions.some((opt) => selected.includes(opt)) &&
    !allFilteredSelected;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Add filtered options to already selected options that are not visible
    const notVisibleSelected = selected.filter(
      (opt) => !filteredOptions.includes(opt)
    );
    if (e.target.checked) {
      // Avoid duplicates
      const newSelected = Array.from(
        new Set([...notVisibleSelected, ...filteredOptions])
      );
      onChange(newSelected);
    } else {
      onChange(notVisibleSelected);
    }
  };

  const handleOptionChange = (opt: string, checked: boolean) => {
    const updatedSelected = checked
      ? [...selected, opt]
      : selected.filter((v) => v !== opt);
    onChange(updatedSelected);
  };

  const handleDropdownMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ul
      ref={dropdownRef}
      aria-label='Select options'
      data-instance-id={instanceId}
      data-test-id='multi-select-dropdown-list'
      onMouseDown={handleDropdownMouseDown}
      {...stylex.props(styles.dropdownList)}
    >
      {/* Only show Select All if there are at least 2 options */}
      {filteredOptions.length > 1 && (
        <li {...stylex.props(styles.dropdownItem)}>
          <RadioCheckInput
            ref={(el) => {
              if (el) el.indeterminate = someFilteredSelected;
            }}
            checked={allFilteredSelected}
            label={'Select All'}
            type='checkbox'
            onChange={handleSelectAll}
          />
        </li>
      )}
      {filteredOptions.length === 0 ? (
        <li {...stylex.props(styles.noResultsItem)}>
          <span
            aria-label='No results'
            role='img'
            {...stylex.props(styles.noResultsIcon)}
          >
            🔍
          </span>
          {'No results found'}
        </li>
      ) : (
        <div {...stylex.props(styles.virtualizer(virtualizer.getTotalSize()))}>
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const opt = filteredOptions[virtualRow.index];
            return (
              <li
                key={opt}
                {...stylex.props(
                  styles.dropdownItem,
                  styles.dropdownVirtualItem(virtualRow.start)
                )}
              >
                <RadioCheckInput
                  checked={selected.includes(opt)}
                  label={opt}
                  type='checkbox'
                  onChange={(e) => handleOptionChange(opt, e.target.checked)}
                />
              </li>
            );
          })}
        </div>
      )}
    </ul>
  );
};

export default MultiSelectDropdownListBody;

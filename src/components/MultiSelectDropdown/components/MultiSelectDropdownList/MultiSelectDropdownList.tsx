import { useId, useMemo, useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useVirtualizer } from '@tanstack/react-virtual';

import { RadioCheckInput } from '@/components/RadioCheckInput';

import { MultiSelectDropdownListFooter } from './components/MultiSelectDropdownListFooter';
import { MultiSelectDropdownListHeader } from './components/MultiSelectDropdownListHeader';
import { styles } from './MultiSelectDropdownList.stylex';
import type { TMultiSelectDropdownListProps } from './MultiSelectDropdownList.types';

const ROW_HEIGHT = 32;

const MultiSelectDropdownList = ({
  onChange,
  onClose: handleClose,
  options = [],
  selected = [],
}: TMultiSelectDropdownListProps) => {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const instanceId = useId();

  // Search state
  const [search, setSearch] = useState('');

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

  const allSelected = selected.length === options.length;
  const someSelected = selected.length > 0 && !allSelected;
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked ? [...options] : []);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleReset = () => setSearch('');

  return (
    <div
      data-instance-id={instanceId}
      {...stylex.props(styles.container)}
    >
      <MultiSelectDropdownListHeader
        search={search}
        onReset={handleReset}
        onSearchChange={handleSearch}
      />
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
                if (el) el.indeterminate = someSelected;
              }}
              checked={allSelected}
              label={'Select All'}
              type='checkbox'
              onChange={handleSelectAll}
            />
          </li>
        )}
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
      </ul>
      <MultiSelectDropdownListFooter onClose={handleClose} />
    </div>
  );
};

export default MultiSelectDropdownList;

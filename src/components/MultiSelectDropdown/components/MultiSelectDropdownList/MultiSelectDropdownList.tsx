import { useId, useRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useVirtualizer } from '@tanstack/react-virtual';

import { RadioCheckInput } from '@/components/RadioCheckInput';

import { styles } from './MultiSelectDropdownList.stylex';
import type { TMultiSelectDropdownListProps } from './MultiSelectDropdownList.types';

const ROW_HEIGHT = 32;

const MultiSelectDropdownList = ({
  onChange,
  options = [],
  selected = [],
}: TMultiSelectDropdownListProps) => {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const instanceId = useId();

  // Virtualizer setup (for options only, not "Select All")
  const virtualizer = useVirtualizer({
    count: options.length,
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

  return (
    <ul
      ref={dropdownRef}
      aria-label='Select options'
      data-instance-id={instanceId}
      data-test-id='multi-select-dropdown-list'
      role='listbox'
      onMouseDown={handleDropdownMouseDown}
      {...stylex.props(styles.dropdownList)}
    >
      <li
        aria-selected={allSelected}
        role='option'
        {...stylex.props(styles.dropdownItem)}
      >
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
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const opt = options[virtualRow.index];
          return (
            <li
              key={opt}
              aria-selected={selected.includes(opt)}
              role='option'
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
  );
};

export default MultiSelectDropdownList;

import { useId, useRef } from 'react';
import * as stylex from '@stylexjs/stylex';

import { RadioCheckInput } from '@/components/RadioCheckInput';

import { styles } from './MultiSelectDropdownList.stylex';
import type { TMultiSelectDropdownListProps } from './MultiSelectDropdownList.types';

const MultiSelectDropdownList = ({
  onChange,
  options = [],
  selected = [],
}: TMultiSelectDropdownListProps) => {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const instanceId = useId();

  // Check if all options are selected
  const allSelected = selected.length === options.length;
  const someSelected = selected.length > 0 && !allSelected;
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked ? [...options] : []);
  };
  const selectOption = (opt: string) => {
    onChange([...selected, opt]);
  };

  const deselectOption = (opt: string) => {
    onChange(selected.filter((v) => v !== opt));
  };

  const handleOptionChange = (opt: string, checked: boolean) => {
    if (checked) {
      selectOption(opt);
    } else {
      deselectOption(opt);
    }
  };

  // Handle dropdown list mouse event to prevent propagation
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
      {options.map((opt) => (
        <li
          {...stylex.props(styles.dropdownItem)}
          key={opt}
          aria-selected={selected.includes(opt)}
          role='option'
        >
          <RadioCheckInput
            checked={selected.includes(opt)}
            label={opt}
            type='checkbox'
            onChange={(e) => handleOptionChange(opt, e.target.checked)}
          />
        </li>
      ))}
    </ul>
  );
};

export default MultiSelectDropdownList;

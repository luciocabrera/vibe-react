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
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    <div
      ref={dropdownRef}
      data-instance-id={instanceId}
      data-test-id='multi-select-dropdown-list'
      {...stylex.props(styles.dropdownList)}
      onMouseDown={handleDropdownMouseDown}
    >
      <div {...stylex.props(styles.dropdownItem)}>
        <RadioCheckInput
          ref={(el) => {
            if (el) el.indeterminate = someSelected;
          }}
          checked={allSelected}
          label={'Select All'}
          type='checkbox'
          onChange={handleSelectAll}
        />
      </div>
      {options.map((opt) => (
        <div
          {...stylex.props(styles.dropdownItem)}
          key={opt}
        >
          <RadioCheckInput
            checked={selected.includes(opt)}
            label={opt}
            type='checkbox'
            onChange={(e) => handleOptionChange(opt, e.target.checked)}
          />
        </div>
      ))}
    </div>
  );
};

export default MultiSelectDropdownList;

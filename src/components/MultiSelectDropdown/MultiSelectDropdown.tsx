import { useId, useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';

import { MultiSelectDropdownHeader } from './components/MultiSelectDropdownHeader';
import { MultiSelectDropdownList } from './components/MultiSelectDropdownList';
import { styles } from './MultiSelectDropdown.stylex';
import type { MultiSelectDropdownProps } from './MultiSelectDropdown.types';

const MultiSelectDropdown = ({
  onChange: handleChange,
  onReset: handleReset,
  options = [],
  parentRef,
  selected = [],
}: MultiSelectDropdownProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceId = useId();
  const allSelected = selected.length === options.length;

  const handleSetOpen = setOpen;

  const renderLabel = () => {
    if (allSelected) return 'All';
    if (selected.length === 0) return 'None';
    if (selected.length === 1) return selected[0];
    return `${selected[0]}, +${selected.length - 1} more`;
  };

  return (
    <div
      ref={containerRef}
      data-instance-id={instanceId}
      data-test-id='multi-select-dropdown'
      id={instanceId}
      {...stylex.props(styles.container)}
    >
      <MultiSelectDropdownHeader
        instanceId={instanceId}
        open={open}
        parentRef={parentRef}
        onReset={handleReset}
        onSetOpen={handleSetOpen}
      >
        {renderLabel()}
      </MultiSelectDropdownHeader>

      {open && (
        <MultiSelectDropdownList
          options={options}
          selected={selected}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default MultiSelectDropdown;

import { useEffect, useId, useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';

import { getParentElement } from '@/utils/element/getParentElement';

import { Button } from '../Button';

import { MultiSelectDropdownList } from './components/MultiSelectDropdownList';
import { styles } from './MultiSelectDropdown.stylex';
import type { MultiSelectDropdownProps } from './MultiSelectDropdown.types';

const MultiSelectDropdown = ({
  onChange: handleChange,
  onReset,
  options = [],
  parentRef,
  selected = [],
}: MultiSelectDropdownProps) => {
  const [open, setOpen] = useState(false);
  const labelContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const instanceId = useId();

  // Check if all options are selected
  const allSelected = selected.length === options.length;

  // Outside click detection
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Only close if the click is outside both the main component and dropdown
      const target = e.target as Node;
      const triggerButton = triggerButtonRef.current;

      // Don't close if clicked on the trigger button (let the onClick handler handle it)
      if (triggerButton?.contains(target)) return;

      // Close if clicked outside both the dropdown content and trigger
      if (
        !labelContainerRef.current?.contains(target) &&
        !dropdownRef.current?.contains(target)
      )
        setOpen(false);
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    e.preventDefault(); // Prevent any default action

    // If we're inside a parent element that might be clickable (like an accordion),
    // prevent the parent's click event
    const parentElement = getParentElement(parentRef);
    const clickTarget = e.target as HTMLElement;
    if (
      parentElement &&
      (parentElement.contains(clickTarget) || parentElement === clickTarget)
    ) {
      e.nativeEvent.stopImmediatePropagation(); // Stop event completely
    }

    setOpen((prev) => !prev); // Toggle dropdown state
  };
  const handleReset = () => onReset();

  return (
    <div
      ref={containerRef}
      data-instance-id={instanceId}
      data-test-id='multi-select-dropdown'
      id={instanceId}
      {...stylex.props(styles.container)}
    >
      <div
        ref={labelContainerRef}
        data-instance-id={instanceId}
        data-test-id='multi-select-label'
        id={`${instanceId}-multi-select-label`}
        {...stylex.props(styles.label)}
      >
        <button
          ref={triggerButtonRef}
          aria-expanded={open}
          aria-haspopup='listbox'
          data-instance-id={instanceId}
          {...stylex.props(styles.triggerButton)}
          type='button'
          onClick={handleDropdownClick}
        >
          <div
            data-test-id='selected-items-display'
            id={`${instanceId}-selected-items-display`}
            {...stylex.props(styles.selectedItemsDisplay)}
          >
            {(() => {
              if (allSelected) return 'All';
              if (selected.length === 0) return 'None';
              if (selected.length === 1) return selected[0];
              return `${selected[0]}, +${selected.length - 1} more`;
            })()}
          </div>
        </button>
        <Button
          size='sm'
          title={'Reset'}
          variant='secondary'
          onClick={handleReset}
        >
          ⟳
        </Button>
      </div>
      {open && (
        <MultiSelectDropdownList
          options={options}
          selected={selected}
          onChange={handleChange}
        />
        // </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;

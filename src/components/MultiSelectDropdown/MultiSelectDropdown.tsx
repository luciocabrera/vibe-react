import { useEffect, useId, useRef, useState } from "react";
import { styles, dynamicStyles } from './MultiSelectDropdown.stylex';
import * as stylex from '@stylexjs/stylex';
import { getParentElement } from '../../utils/getParentElement';
import { getScrollableParents } from '../../utils/getScrollableParents';
import { getDropdownPositionRelativeToParent } from '../../utils/getDropdownPosition';

import type { MultiSelectDropdownProps } from "./MultiSelectDropdown.types";
const MultiSelectDropdown = ({
  onChange,
  onReset,
  options = [],
  parentRef,
  selected = [],
}: MultiSelectDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [parentResizeTick, setParentResizeTick] = useState(0);
  // Use an instance variable to identify this specific dropdown
  const instanceId = useId();

  // Watch parent element for resize using ResizeObserver
  useEffect(() => {
    const parentElement = getParentElement(parentRef);
    if (!parentElement) return;
    if (typeof window.ResizeObserver !== 'function') return;
    const observer = new ResizeObserver(() => {
      setParentResizeTick(tick => tick + 1); // force re-render on parent resize
    });
    observer.observe(parentElement);
    return () => observer.disconnect();
  }, [parentRef]);

  useEffect(() => {
    // Window resize handler to reposition dropdown if open
    const handleResize = () => {
      if (open) {
        // Force a re-render to update dropdown position
        setOpen(false);
        setTimeout(() => setOpen(true), 0);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open, parentResizeTick]);

  useEffect(() => {
    // Handle scrolling of parent containers to reposition dropdown
    const handleScroll = () => {
      if (open) {
        setOpen(false);
        setTimeout(() => setOpen(true), 0);
      }
    };

    // Use the new utility to get all possible scrollable parent elements
    const scrollableParents = getScrollableParents(containerRef.current);

    // Add scroll event listeners to all scrollable parents
    scrollableParents.forEach(parent => {
      parent.addEventListener('scroll', handleScroll);
    });

    // Always listen to window scroll events
    window.addEventListener("scroll", handleScroll);

    return () => {
      scrollableParents.forEach(parent => {
        parent.removeEventListener('scroll', handleScroll);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open, parentResizeTick]);

  // Check if all options are selected
  const allSelected = selected.length === options.length;
  const someSelected = selected.length > 0 && !allSelected;

  // Outside click detection
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Only close if the click is outside both the main component and dropdown
      const target = e.target as Node;
      const triggerButton = ref.current?.querySelector('[data-test-id="multi-select-trigger"]');

      // Don't close if clicked on the trigger button (let the onClick handler handle it)
      if (triggerButton && triggerButton.contains(target)) {
        return;
      }

      // Close if clicked outside both the dropdown content and trigger
      if (
        (!ref.current || !ref.current.contains(target)) &&
        (!dropdownRef.current || !dropdownRef.current.contains(target))
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    e.preventDefault(); // Prevent any default action

    // If we're inside a parent element that might be clickable (like an accordion),
    // prevent the parent's click event
    const parentElement = getParentElement(parentRef);
    const clickTarget = e.target as HTMLElement;
    if (parentElement && (parentElement.contains(clickTarget) || parentElement === clickTarget)) {
      e.nativeEvent.stopImmediatePropagation(); // Stop event completely
    }

    setOpen((prev) => !prev); // Toggle dropdown state
  };
  const handleReset = () => onReset();
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked ? [...options] : []);
  };
  const handleOptionChange = (opt: string, checked: boolean) => {
    if (checked) onChange([...selected, opt]);
    else onChange(selected.filter((v) => v !== opt));
  };

  // Calculate dropdown dimensions and position when opened
  const dropdownPosition = getDropdownPositionRelativeToParent({
    selector: `[data-instance-id="${instanceId}"]`,
    ref: ref as React.RefObject<HTMLElement>,
    parentRef: parentRef as React.RefObject<HTMLElement>,
    optionsCount: options.length,
  });
  const { left, top, width } = dropdownPosition;

  // Handle dropdown list mouse event to prevent propagation
  const handleDropdownMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Apply static and dynamic styles separately
  const parentElement = getParentElement(parentRef);
  let parentWidth = 0;
  if (parentElement) {
    parentWidth = parentElement.getBoundingClientRect().width;
  }
  const containerDynamicStyles = dynamicStyles.container(parentWidth);
  const dropdownDynamicStyles = dynamicStyles.dropdownList(
    left.toString(),
    top.toString(),
    width.toString()
  );

  return (
    <div
      ref={containerRef}
      data-instance-id={instanceId}
      data-test-id="multi-select-dropdown"
      id="multi-select-dropdown"
      {...stylex.props(styles.container)}
      style={containerDynamicStyles}
    >
      <div
        ref={ref}
        data-instance-id={instanceId}
        data-test-id="multi-select-label"
        id="multi-select-label"
        {...stylex.props(styles.label)}
      >
        <button
          aria-expanded={open}
          aria-haspopup="listbox"
          data-instance-id={instanceId}
          data-test-id="multi-select-trigger"
          id='multi-select-trigger'
          {...stylex.props(styles.triggerButton)}
          type="button"
          onClick={handleDropdownClick}
        >
          <div
            data-test-id="selected-items-display"
            id="selected-items-display"
            {...stylex.props(styles.selectedItemsDisplay)}
          >
            {(() => {
              if (allSelected) return "All";
              if (selected.length === 0) return "None";
              if (selected.length === 1) return selected[0];
              return `${selected[0]}, +${selected.length - 1} more`;
            })()}
          </div>
        </button>
        <button
          id="multi-select-reset"
          {...stylex.props(styles.resetButton)}
          type="button"
          onClick={handleReset}
        >
          ⟳
        </button>
      </div>
      {open && (
        <div
          ref={dropdownRef}
          data-instance-id={instanceId}
          data-test-id="multi-select-dropdown-list"
          id="multi-select-dropdown-list"
          {...stylex.props(styles.dropdownList)}
          style={dropdownDynamicStyles}
          onMouseDown={handleDropdownMouseDown}
        >
          <label {...stylex.props(styles.dropdownLabel)}>
            <input
              ref={(el) => {
                if (el) el.indeterminate = someSelected;
              }}
              checked={allSelected}
              type="checkbox"
              onChange={handleSelectAll}
            />{" "}
            Select All
          </label>
          {options.map((opt) => (
            <label
              key={opt}
              {...stylex.props(styles.dropdownOption)}
            >
              <input
                checked={selected.includes(opt)}
                type="checkbox"
                onChange={(e) => handleOptionChange(opt, e.target.checked)}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;

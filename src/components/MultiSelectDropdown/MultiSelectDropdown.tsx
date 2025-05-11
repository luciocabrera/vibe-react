import { useEffect, useRef, useState } from "react";
import { styles, dynamicStyles } from './MultiSelectDropdown.stylex';
import * as stylex from '@stylexjs/stylex';

import type { MultiSelectDropdownProps } from "./MultiSelectDropdown.types";
const MultiSelectDropdown = ({
  onChange,
  onReset,
  options = [],
  parentId,
  selected = [],
}: MultiSelectDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Use an instance variable to identify this specific dropdown
  const instanceId = useRef<string>(`${Math.random().toString(36).substr(2, 9)}`);
  // Store the accordion width for proper sizing
  const [accordionWidth, setAccordionWidth] = useState<number | null>(null);

  // Get the parent width on mount and when window resizes
  useEffect(() => {
    const calculateParentWidth = () => {
      if (containerRef.current && parentId) {
        // Find the parent element by ID
        const parentElement = document.getElementById(parentId);
        if (parentElement) {
          const width = parentElement.getBoundingClientRect().width;
          setAccordionWidth(width);
        }
      }
    };
    
    // Calculate immediately and on resize
    calculateParentWidth();
    window.addEventListener('resize', calculateParentWidth);
    
    return () => {
      window.removeEventListener('resize', calculateParentWidth);
    };
  }, [parentId]);

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
  }, [open]);

  useEffect(() => {
    // Handle scrolling of parent containers to reposition dropdown
    const handleScroll = () => {
      if (open) {
        // Force a re-render to update dropdown position
        setOpen(false);
        setTimeout(() => setOpen(true), 0);
      }
    };
    
    // Get all possible scrollable parent elements
    const scrollableParents: HTMLElement[] = [];
    let parent = containerRef.current?.parentElement;
    while (parent) {
      const overflowY = window.getComputedStyle(parent).overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') {
        scrollableParents.push(parent);
      }
      parent = parent.parentElement;
    }
    
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
  }, [open]);

  useEffect(() => {
    // Recalculate parent width when dropdown opens
    if (open && parentId) {
      const parentElement = document.getElementById(parentId);
      if (parentElement) {
        const width = parentElement.getBoundingClientRect().width;
        setAccordionWidth(width);
      }
    }
  }, [open, parentId]);

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
    if (parentId) {
      const parentElement = document.getElementById(parentId);
      const clickTarget = e.target as HTMLElement;
      if (parentElement && (parentElement.contains(clickTarget) || parentElement === clickTarget)) {
        e.nativeEvent.stopImmediatePropagation(); // Stop event completely
      }
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
  const getDropdownPosition = () => {
    // Find the trigger button associated with THIS specific dropdown instance
    // Instead of using document.querySelector which finds the first match
    const buttonEl = ref.current?.querySelector(`[data-instance-id="${instanceId.current}"]`);
    
    if (!buttonEl) return { left: 0, top: '100%', width: '100%' };
    
    const rect = buttonEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Find parent element if it exists
    let minTop = 0;
    let parentLeft = 0;
    let parentElement = null;
    
    if (parentId) {
      parentElement = document.getElementById(parentId);
      if (parentElement) {
        const parentRect = parentElement.getBoundingClientRect();
        minTop = parentRect.top;
        parentLeft = parentRect.left;
      }
    }
    
    // Check if dropdown would go off bottom of screen
    const spaceBelow = viewportHeight - rect.bottom;
    const expectedDropdownHeight = Math.min(220, options.length * 30 + 40); // Estimate height
    
    if (spaceBelow < expectedDropdownHeight && rect.top > expectedDropdownHeight) {
      // Place dropdown above the button if there's more space above
      return {
        left: parentElement ? `${parentLeft + 10}px` : `${rect.left}px`, // Use parent left position with padding
        top: `${rect.top - expectedDropdownHeight - 5}px`, // Position above with offset
        width: accordionWidth ? `${accordionWidth - 30}px` : `${rect.width}px`, // Use parent width with padding adjustment
      };
    }
    
    // Default: place dropdown below the button
    return {
      left: parentElement ? `${parentLeft + 10}px` : `${rect.left}px`, // Use parent left position with padding
      top: `${Math.max(minTop + 5, rect.bottom + 5)}px`, // Ensure it doesn't go above parent
      width: accordionWidth ? `${accordionWidth - 30}px` : `${rect.width}px`, // Use parent width with padding adjustment
    };
  };
  
  // Handle dropdown list mouse event to prevent propagation
  const handleDropdownMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  const dropdownPosition = getDropdownPosition();
  const { left, top, width } = dropdownPosition;

  // Apply static and dynamic styles separately
  const containerDynamicStyles = dynamicStyles.container(accordionWidth || 0);
  const dropdownDynamicStyles = dynamicStyles.dropdownList(
    left.toString(),
    top.toString(),
    width.toString()
  );

  return (
    <div
      ref={containerRef}
      data-instance-id={instanceId.current}
      data-test-id="multi-select-dropdown"
      id="multi-select-dropdown"
      {...stylex.props(styles.container)}
      style={containerDynamicStyles}
    >
      <div
        ref={ref}
        data-instance-id={instanceId.current}
        data-test-id="multi-select-label"
        id="multi-select-label"
        {...stylex.props(styles.label)}
      >
        <button
          aria-expanded={open}
          aria-haspopup="listbox"
          data-instance-id={instanceId.current}
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
          data-instance-id={instanceId.current}
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

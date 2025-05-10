import { useEffect, useRef, useState } from "react";

import type { MultiSelectDropdownProps } from "./MultiSelectDropdown.types";
const MultiSelectDropdown = ({
  onChange,
  onReset,
  options = [],
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

  // Get the accordion width on mount and when window resizes
  useEffect(() => {
    const calculateAccordionWidth = () => {
      if (containerRef.current) {
        // Find the proper accordion parent (details tag)
        const accordionItem = containerRef.current.closest('[data-test-id="accordion-item"]');
        if (accordionItem) {
          const width = accordionItem.getBoundingClientRect().width;
          setAccordionWidth(width);
        }
      }
    };
    
    // Calculate immediately and on resize
    calculateAccordionWidth();
    window.addEventListener('resize', calculateAccordionWidth);
    
    return () => {
      window.removeEventListener('resize', calculateAccordionWidth);
    };
  }, []);

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
    // Recalculate accordion width when dropdown opens
    if (open) {
      const accordionItem = containerRef.current?.closest('[data-test-id="accordion-item"]');
      if (accordionItem) {
        const width = accordionItem.getBoundingClientRect().width;
        setAccordionWidth(width);
      }
    }
  }, [open]);

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
    
    // If we're inside an accordion, prevent the accordion toggle
    const accordionItem = (e.target as HTMLElement).closest('[data-test-id="accordion-item"]');
    if (accordionItem) {
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
  const getDropdownPosition = () => {
    // Find the trigger button associated with THIS specific dropdown instance
    // Instead of using document.querySelector which finds the first match
    const buttonEl = ref.current?.querySelector(`[data-instance-id="${instanceId.current}"]`);
    
    if (!buttonEl) return { left: 0, top: '100%', width: '100%' };
    
    const rect = buttonEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Find parent accordion item if it exists
    const accordionItem = containerRef.current?.closest('[data-test-id="accordion-item"]');
    
    // If we have an accordion parent, ensure the dropdown doesn't overlap with other accordion items
    let minTop = 0;
    let accordionLeft = 0;
    if (accordionItem) {
      const accordionRect = accordionItem.getBoundingClientRect();
      minTop = accordionRect.top;
      accordionLeft = accordionRect.left;
    }
    
    // Check if dropdown would go off bottom of screen
    const spaceBelow = viewportHeight - rect.bottom;
    const expectedDropdownHeight = Math.min(220, options.length * 30 + 40); // Estimate height
    
    if (spaceBelow < expectedDropdownHeight && rect.top > expectedDropdownHeight) {
      // Place dropdown above the button if there's more space above
      return {
        left: accordionItem ? `${accordionLeft + 10}px` : `${rect.left}px`, // Use accordion left position with padding
        top: `${rect.top - expectedDropdownHeight - 5}px`, // Position above with offset
        width: accordionWidth ? `${accordionWidth - 30}px` : `${rect.width}px`, // Use accordion width with padding adjustment
      };
    }
    
    // Default: place dropdown below the button
    return {
      left: accordionItem ? `${accordionLeft + 10}px` : `${rect.left}px`, // Use accordion left position with padding
      top: `${Math.max(minTop + 5, rect.bottom + 5)}px`, // Ensure it doesn't go above accordion item
      width: accordionWidth ? `${accordionWidth - 30}px` : `${rect.width}px`, // Use accordion width with padding adjustment
    };
  };
  
  // Handle dropdown list mouse event to prevent propagation
  const handleDropdownMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  return (
    <div
      ref={containerRef}
      data-instance-id={instanceId.current}
      data-test-id="multi-select-dropdown"
      id="multi-select-dropdown"
      style={{
        maxWidth: accordionWidth ? `${accordionWidth - 20}px` : "100%", // Use accordion width with padding
        overflow: "visible", // Allow the dropdown to be visible outside
        position: "relative", // Ensure dropdown is positioned relative to this container
        width: accordionWidth ? `${accordionWidth - 20}px` : "100%", // Use accordion width with padding
      }}
    >
      <div
        ref={ref}
        data-instance-id={instanceId.current}
        data-test-id="multi-select-label"
        id="multi-select-label"
        style={{
          boxSizing: "border-box",
          display: "flex",
          maxWidth: "100%", // Ensure it doesn't exceed parent width
          position: "relative", // Added for proper child positioning
          width: "100%", // Take full available width
        }}
      >
        {/* <div style={{ flex: "1 1 auto", marginRight: "8px", minWidth: 0 }}> */}
        <button
          aria-expanded={open}
          aria-haspopup="listbox"
          data-instance-id={instanceId.current}
          data-test-id="multi-select-trigger"
          id='multi-select-trigger'
          style={{
            alignItems: "center",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 4,
            boxSizing: "border-box",
            cursor: "pointer",
            display: "flex",
            flex: "1 1 auto", // Allow the button to shrink
            marginRight: "8px",
            maxWidth: "calc(100% - 30px)", // Leave space for the reset button
            minWidth: 0, // Allow shrinking below content size
            overflow: "hidden", // Added to contain child elements
            padding: "6px 10px",
            textAlign: "left",
            userSelect: "none", // Prevent text selection
            width: "100%",
          }}
          type="button"
          onClick={handleDropdownClick}
        >
          <div
            data-test-id="selected-items-display"
            id="selected-items-display"
            style={{
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {(() => {
              if (allSelected) return "All";
              if (selected.length === 0) return "None";
              if (selected.length === 1) return selected[0];
              return `${selected[0]}, +${selected.length - 1} more`;
            })()}
          </div>
        </button>
        {/* </div> */}

        <button
          id="multi-select-reset"
          style={{ flex: "0 0 auto" }}
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
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 4,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
            boxSizing: "border-box",
            maxHeight: 220,
            maxWidth: accordionWidth ? `${accordionWidth - 30}px` : "100%", // Use accordion width
            overflowX: "hidden",
            overflowY: "auto",
            padding: "4px 0",
            position: "fixed", // Fixed positioning to escape overflow constraints
            ...getDropdownPosition(), // Apply calculated position
            zIndex: 9999, // Higher z-index to ensure it appears above other elements
          }}
          onMouseDown={handleDropdownMouseDown}
        >
          <label
            style={{
              borderBottom: "1px solid #eee",
              display: "block",
              fontWeight: "bold",
              marginBottom: 4,
              overflow: "hidden",
              padding: "4px 10px",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
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
              style={{
                display: "block",
                overflow: "hidden",
                padding: "4px 10px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
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

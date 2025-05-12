// Utility to calculate dropdown position relative to a parent element
// Accepts:
// - selector: string (to find the trigger button inside ref)
// - ref: React.RefObject<HTMLElement> (container holding the trigger)
// - parentRef: React.RefObject<HTMLElement> (parent container)
// - optionsCount: number (for height estimation)
// Returns: { left: string, top: string, width: string }

type TGetPositionRelativeToParentArgs = {
  dropdownHeight?: number;
  dropdownPadding?: number;
  optionHeight?: number;
  optionsCount: number;
  parentPadding?: number;
  parentRef?: React.RefObject<HTMLElement | null>;
  parentWidthOffset?: number;
  ref: React.RefObject<HTMLElement>;
  selector: string;
}

export const getPositionRelativeToParent = ({
  dropdownHeight = 220,
  dropdownPadding = 40,
  optionHeight = 30,
  optionsCount,
  parentPadding = 10,
  parentRef,
  parentWidthOffset = 30,
  ref,
  selector,
}: TGetPositionRelativeToParentArgs) => {
  const buttonEl = ref.current?.querySelector(selector) as HTMLElement | null;
  if (!buttonEl) return { left: '0', top: '100%', width: '100%' };

  const rect = buttonEl.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  let minTop = 0;
  let parentLeft = 0;
  let parentWidth = 0;
  let parentElement: HTMLElement | null = null;
  if (parentRef && parentRef.current) {
    parentElement = parentRef.current;
    const parentRect = parentElement.getBoundingClientRect();
    minTop = parentRect.top;
    parentLeft = parentRect.left;
    parentWidth = parentRect.width;
  }
  const spaceBelow = viewportHeight - rect.bottom;
  const expectedDropdownHeight = Math.min(dropdownHeight, optionsCount * optionHeight + dropdownPadding);

  if (spaceBelow < expectedDropdownHeight && rect.top > expectedDropdownHeight) {
    // Place dropdown above the button if there's more space above
    return {
      left: parentElement ? `${parentLeft + parentPadding}px` : `${rect.left}px`,
      top: `${rect.top - expectedDropdownHeight - 5}px`,
      width: parentElement ? `${parentWidth - parentWidthOffset}px` : `${rect.width}px`,
    };
  }
  // Default: place dropdown below the button
  return {
    left: parentElement ? `${parentLeft + parentPadding}px` : `${rect.left}px`,
    top: `${Math.max(minTop + 5, rect.bottom + 5)}px`,
    width: parentElement ? `${parentWidth - parentWidthOffset}px` : `${rect.width}px`,
  };
}

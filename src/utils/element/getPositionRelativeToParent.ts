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
};

export const getPositionRelativeToParent = ({
  dropdownHeight = 220,
  dropdownPadding = 40,
  optionHeight = 30,
  optionsCount,
  parentRef,
  ref,
  selector,
}: TGetPositionRelativeToParentArgs) => {
  const buttonEl = ref.current?.querySelector(selector);
  if (!buttonEl) return { left: '0', top: '100%', width: '100%' };

  const rect = buttonEl.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  let minTop = 0;
  let parentLeft = 0;
  let parentWidth = 0;
  let parentElement: HTMLElement | null = null;
  if (parentRef?.current) {
    parentElement = parentRef.current;
    const parentRect = parentElement.getBoundingClientRect();
    minTop = parentRect.top;
    parentLeft = parentRect.left;
    parentWidth = parentRect.width;
  }

  const expectedDropdownHeight = Math.min(
    dropdownHeight,
    optionsCount * optionHeight + dropdownPadding
  );
  const top = Math.max(minTop, rect.bottom + dropdownPadding);
  const bottomSpace = viewportHeight - top;
  const isOverflowing = bottomSpace < expectedDropdownHeight;

  return {
    left: `${parentLeft}px`,
    top: `${isOverflowing ? Math.max(minTop, rect.top - expectedDropdownHeight - dropdownPadding) : top}px`,
    width: `${parentWidth}px`,
  };
};

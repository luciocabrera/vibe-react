/**
 * Returns all scrollable parent elements of a given element.
 * @param element The element whose scrollable parents to find
 * @returns An array of scrollable parent HTMLElements
 */
export function getScrollableParents(element: HTMLElement | null): HTMLElement[] {
  const scrollableParents: HTMLElement[] = [];
  let parent = element?.parentElement;
  while (parent) {
    const overflowY = window.getComputedStyle(parent).overflowY;
    if (overflowY === 'auto' || overflowY === 'scroll') {
      scrollableParents.push(parent);
    }
    parent = parent.parentElement;
  }
  return scrollableParents;
}

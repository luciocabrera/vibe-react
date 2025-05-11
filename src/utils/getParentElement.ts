import type { RefObject } from 'react';

/**
 * Returns the parent element from a React ref, or null if not available.
 * @param parentRef - React ref to the parent element
 */
export function getParentElement(parentRef?: RefObject<HTMLElement>): HTMLElement | null {
  if (parentRef && parentRef.current) return parentRef.current;
  return null;
}

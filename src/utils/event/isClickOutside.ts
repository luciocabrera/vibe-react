// Utility to check if a click event target is outside a set of elements
export function isClickOutside(
  target: Node | null,
  elements: (HTMLElement | null | undefined)[]
): boolean {
  return elements.every((el) => !el || !el.contains(target));
}

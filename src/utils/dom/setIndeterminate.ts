// Utility to set the indeterminate state of a checkbox
export function setIndeterminate(
  el: HTMLInputElement | null,
  indeterminate: boolean
) {
  if (el) {
    el.indeterminate = indeterminate;
  }
}

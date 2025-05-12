/**
 * Groups an array of items by a specified key.
 *
 * @template T - The type of the items in the array.
 * @param {T[]} array - The array of items to be grouped.
 * @param {string | ((item: T) => string)} groupingKey - The key used for grouping. Can be a string or a function that returns a string.
 * @returns {Record<string, T[]>} - An object where the keys are the groups and the values are arrays of items belonging to each group.
 */
export const groupBy = <T>(
  array: T[],
  groupingKey: string | ((item: T) => string)
) =>
  array.reduce(
    (previous, currentItem) => {
      const group =
        typeof groupingKey === 'function'
          ? groupingKey(currentItem)
          : groupingKey;
      previous[group].push(currentItem);
      return previous;
    },
    {} as Record<string, T[]>
  );

/**
 * Sorts an array of objects by a specified key in ascending or descending order.
 *
 * @template T - The type of the objects in the array.
 * @param {T[]} array - The array to be sorted.
 * @param {string} sortingKey - The key to sort the objects by.
 * @param {'asc' | 'desc'} [order='asc'] - The order in which to sort the array. Defaults to 'asc'.
 * @returns {T[]} - The sorted array.
 * ```ts
 * sortArrayBy([{"name":"apple", "color":"green"},{"name":"orange", "color":"orange"}],'name')
 * ```
 */
export const sortArrayBy = <T extends Record<string, unknown>>(
  array: T[],
  sortingKey: string,
  order: 'asc' | 'desc' = 'asc'
) => [...array].sort(sortBy(sortingKey, order));

/**
 * Sorts an array of objects by a specified key in ascending or descending order.
 * @param key - The key to sort the objects by.
 * @param order - The order in which to sort the objects. Defaults to 'asc'.
 * @returns A comparison function that can be used with the `Array.sort()` method.
 * When comparing strings, upper case letters have a different weight than lower case letters and A would be, for instance, positioned after b.
 * It's generally considered good practice to equalize the strings to either all lowercase or all uppercase (more commonly, lowercase, due to efficiency).
 * ```ts
 * const data = [{"name":"apple"},{"name":"Orange"},{"name":"banana"}];
 * data.sort(sortBy('name'));
 * // [
// ...existing code (truncated for brevity)...

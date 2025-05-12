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
 * [{"name":"apple", "color":"green"},{"name":"orange", "color":"orange"}].sort(sortBy('name'))
 * ```
 */
export const sortBy =
  (key: number | string, order: 'asc' | 'desc' = 'asc') =>
  (a: Record<string, unknown>, b: Record<string, unknown>) => {
    const valueA =
      typeof a[key] === 'number'
        ? (a[key] as number)
        : String(a[key]).toUpperCase();
    const valueB =
      typeof b[key] === 'number'
        ? (b[key] as number)
        : String(b[key]).toUpperCase();

    return compareValues(valueA, valueB, order);
  };

/**
 * Compares two values and returns a comparison result based on the specified order.
 * @param valueA - The first value to compare.
 * @param valueB - The second value to compare.
 * @param order - The order in which to compare the values. Defaults to 'asc'.
 * @returns A negative number if valueA is less than valueB, a positive number if valueA is greater than valueB,
 *          or zero if valueA and valueB are equal.
 */
export const compareValues = (
  valueA: number | string,
  valueB: number | string,
  order: 'asc' | 'ascend' | 'desc' | 'descend' = 'asc'
) => {
  let comparison = 0;

  if (valueA > valueB) {
    comparison = 1;
  } else {
    comparison = valueB > valueA ? -1 : 0;
  }

  return order.startsWith('desc') ? comparison * -1 : comparison;
};

/**
 * Filters a value based on a record value.
 * @param value - The value to filter.
 * @param recordValue - The record value to compare against.
 * @returns A boolean indicating whether the record value includes the search value.
 */
export const filter = (
  value: boolean | number | string,
  recordValue: number | string
) => {
  const searchValue = String(value).toLowerCase().trim();
  if (!recordValue) return false;

  return String(recordValue).toLowerCase().includes(searchValue);
};

/**
 * Converts an array of strings into an enum-like object.
 * @param o - The array of strings to convert.
 * @returns An object where each string in the array is both a key and a value.
 */
export const strArrayToEnum = <T extends string>(o: T[]): { [K in T]: K } =>
  o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));

/**
 * @description determine if an array contains one or more items from another array.
 * @param {array} haystack the array to search.
 * @param {array} array the array providing items to check for in the haystack.
 * @return {boolean} true|false if haystack contains at least one item from arr.
 */
export const findOne = (
  haystack: (Record<string, unknown> | string)[],
  array: (Record<string, unknown> | string)[]
) => {
  return array.some((v) => haystack.includes(v));
};

/**
 * Sorts an array of objects based on the specified fields.
 * @param fields - An array of field names to sort by.
 * @returns A function that can be used as a comparator for sorting.
 */
export const fieldSorter =
  (fields: string[]) =>
  (a: Record<string, number | string>, b: Record<string, number | string>) =>
    fields
      .map((o) => {
        let dir = 1;
        if (o.startsWith('-')) {
          dir = -1;
          o = o.substring(1);
        }

        const valueA =
          typeof a[o] === 'number'
            ? (a[o] as number)
            : String(a[o]).toUpperCase();
        const valueB =
          typeof b[o] === 'number'
            ? (b[o] as number)
            : String(b[o]).toUpperCase();

        if (valueA > valueB) {
          return dir;
        } else {
          return valueA < valueB ? -dir : 0;
        }
      })
      .reduce((p) => p, 0);

/**
 * Converts an array of objects into an object, using a specified key field as the object keys.
 *
 * @template TData - The type of the objects in the array.
 * @param {TData[]} array - The array of objects to convert.
 * @param {string} keyField - The key field to use as the object keys.
 * @returns {Record<string, TData>} - The resulting object with the specified key field as keys.
 */
export const arrayToObject = <TData extends Record<string, unknown>>(
  array: TData[],
  keyField: keyof TData
) =>
  array.reduce(
    (obj, item) => {
      obj[item[keyField] as keyof TData] = item;
      return obj;
    },
    {} as Record<keyof TData, TData>
  );

/**
 * Joins the elements of an array into a string using a specified separator.
 * If no separator is provided, a space character is used as the default separator.
 *
 * @param array - The array of strings to join.
 * @param separator - The string used to separate the array elements. Defaults to a space character.
 * @returns A string that contains the joined elements of the array.
 */
export const joinArray = (array: string[], separator?: string) =>
  array.join(separator ?? ' ');

/**
 * Generates an array of numbers within a specified range.
 *
 * @param start - The starting number of the range (default: 1).
 * @param stop - The ending number of the range.
 * @param step - The increment value between numbers in the range (default: 1).
 * @returns An array of numbers within the specified range.
 */
export const arrayRange = (start = 1, stop: number, step = 1) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_value, index) => start + index * step
  );

/**
 * Converts an array of values to an array of options.
 *
 * @param array - The array of values to convert.
 * @returns An array of options with `label` and `value` properties.
 */
export const arrayToOptions = <T>(array: readonly T[]) =>
  array.map((ele) => ({ label: ele, value: ele }));

/**
 * Merges an array of objects with a single object based on a specified key.
 * @param arr - The array of objects to merge.
 * @param obj - The object to merge with the array.
 * @param key - The key to compare for merging.
 * @returns A new array with the merged object, if the key matches, or the original object otherwise.
 */
export const mergeArrayWithObject = <TData>(
  arr: TData[],
  obj: TData,
  key: keyof TData
) => arr.map((t) => (t[key] === obj[key] ? obj : t));

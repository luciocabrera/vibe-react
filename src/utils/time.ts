import type { TDateDisplayProps } from '@/components/display/DateDisplay/DateDisplay.types';

type TGetDateAsStringArgs = TDateDisplayProps;

/**
 * Converts a date value to a string representation.
 *
 * @param iso - Whether to return the date in ISO format.
 * @param output - The desired output format ('date' or 'datetime').
 * @param value - The date value to convert.
 * @returns The string representation of the date.
 */
export const getDateAsString = ({
  iso = false,
  output = 'date',
  value,
}: TGetDateAsStringArgs): string => {
  if (!value) return '';

  const jsDate = value instanceof Date ? value : new Date(value);

  if (output === 'date') {
    return iso
      ? jsDate.toISOString().slice(0, 10)
      : jsDate.toLocaleDateString();
  }
  return iso ? jsDate.toISOString() : jsDate.toLocaleString();
};

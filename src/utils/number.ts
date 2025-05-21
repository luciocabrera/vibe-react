import { getLanguage } from './language';

/**
 * Formats a number or string value into a specified format.
 *
 * @param value - The number or string value to be formatted.
 * @param output - The desired output format. Defaults to 'number'.
 * @returns The formatted number as a string.
 */
export const getFormattedNumber = (
  value?: number | string,
  output: 'currency' | 'number' = 'number'
): string => {
  if (!value) return '';

  const sanitizedValue = value as number;

  const locale = getLanguage();

  switch (output) {
    case 'currency':
      return new Intl.NumberFormat(locale, {
        currency: 'EUR',
        style: 'currency',
      }).format(sanitizedValue);
    case 'number':
    default:
      return new Intl.NumberFormat().format(sanitizedValue);
  }
};

/**
 * Parses a value to a number with the specified decimal places.
 * @param value - The value to parse. It can be a number or a string.
 * @param decimalPlaces - The number of decimal places to round the parsed value to. Default is 2.
 * @returns The parsed value as a number.
 */
export const parseToNumber = (value: number | string, decimalPlaces = 2) => {
  const decimalPlacesString = decimalPlaces.toString();
  const valueString = typeof value === 'number' ? value.toString() : value;
  const mathRounded = Math.round(
    parseFloat(`${valueString}e${decimalPlacesString}`)
  ).toString();

  return Number(`${mathRounded}e${decimalPlacesString}`);
};

import { RadioCheckInput } from '@/components/RadioCheckInput';

import type { TCheckboxProps } from './TableCheckbox.types';

/**
 * Renders a checkbox input component for a table.
 *
 * @template TData - The type of data in the table.
 * @template TValue - The type of value for the checkbox.
 *
 * @param {TCheckboxProps<TData, TValue>} props - The props for the TableCheckbox component.
 * @param {TCheckboxProps<TData, TValue>.info} props.info - The information about the checkbox.
 *
 * @returns {JSX.Element} The rendered TableCheckbox component.
 */
const TableCheckbox = <TData, TValue = boolean>({
  info,
  ...props
}: TCheckboxProps<TData, TValue>) => {
  const isChecked = info.getValue() === true || info.getValue() === 'on';
  const handleChange = () => isChecked;

  return (
    <RadioCheckInput
      checked={isChecked}
      name={info.column.id}
      onChange={handleChange}
      {...props}
    />
  );
};

export default TableCheckbox;

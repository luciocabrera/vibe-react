import * as stylex from '@stylexjs/stylex';

import { styles } from './Select.stylex';
import type { TSelectProps } from './Select.types';

const Select = ({
  label,
  name,
  options,
  ref,
  showDefaultOption = true,
  ...props
}: TSelectProps) => {
  return (
    <select
      {...props}
      {...stylex.props(styles.input)}
      ref={ref}
      aria-label={name}
    >
      {showDefaultOption && (
        <option
          key='default-option'
          id='default-option'
          value=''
        >
          Choose {label}
        </option>
      )}
      {options?.map((option) => (
        <option
          key={option.value}
          id={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;

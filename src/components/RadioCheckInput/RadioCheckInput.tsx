import * as stylex from '@stylexjs/stylex';

import { styles } from './RadioCheckInput.stylex';
import type { TRadioCheckInputProps } from './RadioCheckInput.types';

const RadioCheckInput = ({
  id,
  label = '',
  name,
  type = 'checkbox',
  ...props
}: TRadioCheckInputProps) => {
  return (
    <label
      {...stylex.props(styles.customCheck)}
      htmlFor={id}
    >
      <input
        {...props}
        aria-label={name}
        id={id}
        name={name}
        type={type}
        {...stylex.props(styles.input)}
      />
      <span
        {...stylex.props(
          styles.mark,
          type === 'radio' && styles.markRadio,
          props.checked && styles.markChecked
        )}
      >
        <span
          {...stylex.props(
            styles.markCheck,
            !props.checked && styles.markCheckHidden
          )}
        />
      </span>
      <span {...stylex.props(styles.labelText)}>{label}</span>
    </label>
  );
};

export default RadioCheckInput;

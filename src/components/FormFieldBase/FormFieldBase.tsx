import { FaLock, FaStar } from 'react-icons/fa';
import * as stylex from '@stylexjs/stylex';

import { styles } from './FormFieldBase.stylex';
import type { TFormFieldBaseProps } from './FormFieldBase.types';

const FormFieldBase = <TData extends Record<string, unknown>>({
  children,
  id,
  isViewing = true,
  label,
  readonly,
  required,
  ...props
}: TFormFieldBaseProps<TData>) => {
  const { errorMessage, hasErrors, maxWidth, minWidth, size, width } = props;

  return (
    <div
      {...stylex.props(
        styles.fieldBase,
        !!size && styles.size(size),
        !!maxWidth && styles.maxWidth(maxWidth),
        !!minWidth && styles.minWidth(minWidth),
        !!width && styles.width(width)
      )}
    >
      <fieldset
        disabled={readonly}
        id={`${id}_fieldset`}
        {...stylex.props(
          styles.fieldset,
          readonly ? styles.readonly : styles.notReadonly
        )}
      >
        <legend {...stylex.props(styles.legend)}>
          <label {...stylex.props(styles.label)} htmlFor={id}>
            {label}
            {required && !isViewing && (
              <FaStar {...stylex.props(styles.legendIcon)} />
            )}
            {readonly && !isViewing && (
              <FaLock {...stylex.props(styles.legendIcon)} />
            )}
          </label>
        </legend>
        {children}
      </fieldset>

      {!isViewing && (
        <span
          {...stylex.props(styles.errorMessage)}
          role="alert"
          aria-live="assertive"
        >
          {hasErrors && errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormFieldBase;


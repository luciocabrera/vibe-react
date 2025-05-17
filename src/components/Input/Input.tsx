import * as stylex from '@stylexjs/stylex';

import { styles } from './Input.stylex';
import type { TInputProps } from './Input.types';

const Input = (props: TInputProps) => (
  <input
    {...props}
    {...stylex.props(styles.input)}
    autoComplete='off'
  />
);

export default Input;

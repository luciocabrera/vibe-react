import * as stylex from '@stylexjs/stylex';

import { styles } from './SpanDisplay.stylex';
import type { TSpanDisplayProps } from './SpanDisplay.types';

const SpanDisplay = ({ shouldCenter, value }: TSpanDisplayProps) =>
  value && (
    <span {...stylex.props(styles.span, shouldCenter && styles.center)}>
      {value}
    </span>
  );

export default SpanDisplay;

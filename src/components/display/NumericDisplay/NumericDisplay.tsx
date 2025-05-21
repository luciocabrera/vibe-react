import * as stylex from '@stylexjs/stylex';

import { getFormattedNumber } from '@/utils/number';

import { styles } from './NumericDisplay.stylex';
import type { TNumericDisplayProps } from './NumericDisplay.types';

const NumericDisplay = ({ output, value }: TNumericDisplayProps) => (
  <span {...stylex.props(styles.span)}>
    {getFormattedNumber(value, output)}
  </span>
);

export default NumericDisplay;

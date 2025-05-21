import * as stylex from '@stylexjs/stylex';

import { getDateAsString } from '@/utils/time';

import { styles } from './DateDisplay.stylex';
import type { TDateDisplayProps } from './DateDisplay.types';

const DateDisplay = ({ iso, output, value }: TDateDisplayProps) => (
  <span {...stylex.props(styles.span)}>
    {getDateAsString({ iso, output, value })}
  </span>
);

export default DateDisplay;

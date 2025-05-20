import * as stylex from '@stylexjs/stylex';

import { maxWidths } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  paddingCell: (width) => ({
    display: 'flex',
    width,
  }),
  row: (translateY) => ({
    display: 'flex',
    position: 'absolute',
    transform: `translateY(${translateY}px)`,
    width: maxWidths.full,
  }),
});
